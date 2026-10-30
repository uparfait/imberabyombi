/* events/event_page.jsx: one event or activity on its own page (/admin/events/<id>, /admin/calendar/<id>: from a table
   row, a card or the calendar): its title, its details as cards by section, each edited on its own, its invitations (event_invites.jsx),
   and on the right where it stands (ev_state) with the actions that fit it now (postpone, cancel, back on schedule, mark
   as completed, stop repeating, duplicate, delete). Reading only (no managing rights): no Edit buttons, no actions and no
   new invites. */
import { db, route, after_render, TIMERS } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge, empty, help_tip } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { count_to, left, tick } from './countdown.js';
import { event_cards } from './event_cards.jsx';
import { invites_card } from './event_invites.jsx';

const HELP = 'Every detail of this event, by section. Edit a section on its own; postpone, cancel or restore the event on the right.';
/* the actions that fit each state: [handler, label, icon, the states it shows in] */
const ACTS = [
  ['ev_postpone', 'Postpone', 'clock', ['Upcoming', 'Recurring']], ['ev_postpone', 'Change the new date', 'calendar', ['Postponed']],
  ['ev_restore', 'Back on schedule', 'check', ['Postponed', 'Cancelled']], ['ev_done', 'Mark as completed', 'check', ['Live']],
  ['ev_stop', 'Stop repeating', 'x', ['Recurring']], ['ev_copy', 'Duplicate', 'copy', null],
  ['ev_cancel', 'Cancel event', 'x', ['Upcoming', 'Live', 'Recurring', 'Postponed']], ['ev_del', 'Delete', 'trash', null]
];
const side = (e, st, t = count_to(e, st)) => <aside className="card ev_card ev_side" aria-label="Status and actions">
  <h3 className="ev_side_title">Status</h3><div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">{badge(st)}
    {t ? <span className="ev_left">{t[0]} <b data-count-to={t[1]}>{left(t[1] - Date.now())}</b></span> : null}</div>
  {e.status_note && (st === 'Postponed' || st === 'Cancelled') ? <p className="ev_note">{e.status_note}</p> : null}
  <div className="ev_acts">{ACTS.filter(a => !a[3] || a[3].includes(st)).map(([k, l, i]) =>
    <button key={k + l} type="button" className={`btn btn_sm ${k === 'ev_cancel' || k === 'ev_del' ? 'btn_ghost ev_bad' : 'btn_outline'}`} data-act={k} data-id={e.id}>
      {ic(i, 'h-4 w-4')}{l}</button>)}</div></aside>;

export function event_page(id) {
  const e = db.find('events', id);
  if (!e) return empty('Event not found', 'It may have been deleted. Go back to the events and pick another.',
    <a href={to('/admin/events')} className="btn btn_outline btn_sm">{ic('chev_l', 'h-4 w-4')}Back to events</a>, 'alert', 'warn');
  route.title = e.title; const st = ev_state(e), can = auth.can('events', 2);
  after_render(() => TIMERS.push(setInterval(tick, 1000)));   /* the time left counts down */
  /* the way back is an arrow at the start of the title row (never a line above the title) */
  return <div className="ev_page">
    <div className="ev_head"><a href={to('/admin/events')} className="icon_btn ev_back" aria-label="Back to events" data-tip="Back to events">{ic('chev_l')}</a>
      <h2 className="ev_title">{e.title}</h2>{help_tip(HELP, 'this event')}</div>
    <div className={`ev_grid ${can ? '' : 'ev_one'}`}><div className="ev_main">{event_cards(e, can)}{invites_card(e, st, can)}</div>{can ? side(e, st) : null}</div></div>;
}
