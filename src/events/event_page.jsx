/* events/event_page.jsx: one event on its own page (/admin/events/<id>, from a row of the Events table, a card or the
   calendar): its title and where it stands (ev_state), its details as cards by section, each edited on its own, and on
   the right its status with the actions that fit it now (postpone, cancel, back on schedule, mark as completed, stop
   repeating, duplicate, delete). Reading only (no managing rights): no Edit buttons and no actions. */
import { db, route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge, empty, help_tip } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { event_cards } from './event_cards.jsx';

const HELP = 'Every detail of this event, by section. Edit a section on its own; postpone, cancel or restore the event on the right.';
/* the actions that fit each state: [handler, label, icon, the states it shows in] */
const ACTS = [
  ['ev_postpone', 'Postpone', 'clock', ['Upcoming', 'Recurring']], ['ev_postpone', 'Change the new date', 'calendar', ['Postponed']],
  ['ev_restore', 'Back on schedule', 'check', ['Postponed', 'Cancelled']], ['ev_done', 'Mark as completed', 'check', ['Live']],
  ['ev_stop', 'Stop repeating', 'x', ['Recurring']], ['ev_copy', 'Duplicate', 'copy', null],
  ['ev_cancel', 'Cancel event', 'x', ['Upcoming', 'Live', 'Recurring', 'Postponed']], ['ev_del', 'Delete', 'trash', null]
];
const side = (e, st) => <aside className="card ev_card ev_side" aria-label="Status and actions">
  <h3 className="ev_side_title">Status</h3><div className="mt-2">{badge(st)}</div>
  {e.status_note && (st === 'Postponed' || st === 'Cancelled') ? <p className="ev_note">{e.status_note}</p> : null}
  <div className="ev_acts">{ACTS.filter(a => !a[3] || a[3].includes(st)).map(([k, l, i]) =>
    <button key={k + l} type="button" className={`btn btn_sm ${k === 'ev_cancel' || k === 'ev_del' ? 'btn_ghost ev_bad' : 'btn_outline'}`} data-act={k} data-id={e.id}>
      {ic(i, 'h-4 w-4')}{l}</button>)}</div></aside>;

export function event_page(id) {
  const e = db.find('events', id), back = <a href={to('/admin/events')} className="ev_back">{ic('arrow_back', 'h-4 w-4')}Events</a>;
  if (!e) return <>{back}{empty('Event not found', 'It may have been deleted. Go back to the events and pick another.', null, 'alert', 'warn')}</>;
  route.title = e.title; const st = ev_state(e), can = auth.can('events', 2);
  return <div className="ev_page">{back}
    <div className="ev_head"><h2 className="ev_title">{e.title}</h2>{help_tip(HELP, 'this event')}{badge(st)}</div>
    <div className={`ev_grid ${can ? '' : 'ev_one'}`}><div className="ev_main">{event_cards(e, can)}</div>{can ? side(e, st) : null}</div></div>;
}
