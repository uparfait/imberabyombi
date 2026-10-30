/* events/event_page.jsx: one event or activity on its own page (/admin/events/<id>, /admin/calendar/<id>: from a table
   row, a card or the calendar): its title, its details as one table by section, each edited on its own, its invitations
   (event_invites.jsx), and on the right where it stands (ev_state; when a past one ran) with the actions that fit it now
   (postpone, cancel, back on schedule, mark as completed, stop repeating, delete) and attendance (attend_side.jsx).
import { db, route, after_render, TIMERS } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge, empty, help_tip } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { count_to, left, tick, ran } from './countdown.js';
import { fmt_stamp } from '../lib/index.js';
import { event_cards } from './event_cards.jsx';
import { invites_card } from './event_invites.jsx';
import { attend_side } from './attend_side.jsx';

const HELP = { events: 'Every detail, by section. Edit a section on its own; postpone, cancel or restore it on the right.',
  activities: 'Every detail, by section. Edit a section on its own.' };
const acts_ok = c => auth.can(c === 'events' ? 'events' : 'calendar', 2);
const ROOT = { events: ['/admin/events', 'events', 'Event'], activities: ['/admin/calendar', 'calendar', 'Activity'] };
/* the actions that fit each state: [handler, label, icon, the states it shows in] */
const ACTS = [
  ['ev_postpone', 'Postpone', 'clock', ['Upcoming', 'Recurring']], ['ev_postpone', 'Change the new date', 'calendar', ['Postponed']],
  ['ev_restore', 'Back on schedule', 'check', ['Postponed', 'Cancelled']], ['ev_done', 'Mark as completed', 'check', ['Live']],
  ['ev_stop', 'Stop repeating', 'x', ['Recurring']], ['ev_copy', 'Duplicate', 'copy', null],
  ['ev_cancel', 'Cancel event', 'x', ['Upcoming', 'Live', 'Recurring', 'Postponed']], ['ev_del', 'Delete', 'trash', null]
];
const side = (e, c, st, acts, t = count_to(e, st), r = st === 'Past' && ran(e)) => <aside className="card ev_card ev_side" aria-label="Status and actions">
  <h3 className="ev_side_title">Status</h3><div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">{badge(st)}
    {t ? <span className="ev_left">{t[0]} <b data-count-to={t[1]}>{left(t[1] - Date.now())}</b></span> : null}</div>
  {r ? <dl className="ev_ran"><dt>Started</dt><dd>{fmt_stamp(r[0], { dateStyle: 'full', timeStyle: 'short' })}</dd>
    <dt>Ended</dt><dd>{fmt_stamp(r[1], { dateStyle: 'full', timeStyle: 'short' })}</dd></dl> : null}
  {e.status_note && (st === 'Postponed' || st === 'Cancelled') ? <p className="ev_note">{e.status_note}</p> : null}
  {acts ? <div className="ev_acts">{ACTS.filter(a => !a[3] || a[3].includes(st)).map(([k, l, i]) =>
    <button key={k + l} type="button" className={`btn btn_sm ${k === 'ev_cancel' || k === 'ev_del' ? 'btn_ghost ev_bad' : 'btn_outline'}`} data-act={k} data-id={e.id}>
      {ic(i, 'h-4 w-4')}{l}</button>)}</div> : null}{attend_side(e, c, acts_ok(c))}</aside>;

export function event_page(id, c = 'events') {
  const [back, mod, word] = ROOT[c], e = db.find(c, id), ev = c === 'events';
  if (!e) return empty(`${word} not found`, 'It may have been deleted.',
    <a href={to(back)} className="btn btn_outline btn_sm">{ic('chev_l', 'h-4 w-4')}Back</a>, 'alert', 'warn');
  route.title = e.title; const st = ev_state(e), can = auth.can(mod, 2);
  after_render(() => TIMERS.push(setInterval(tick, 1000)));   /* the time left counts down */
  /* the way back is an arrow at the start of the title row (never a line above the title) */
  return <div className="ev_page">
    <div className="ev_head"><a href={to(back)} className="icon_btn ev_back" aria-label="Back" data-tip="Back">{ic('chev_l')}</a>
      <h2 className="ev_title">{e.title}</h2>{help_tip(HELP[c], word.toLowerCase())}</div>
    <div className="ev_grid"><div className="ev_main">{event_cards(e, can, c)}{ev ? invites_card(e, st, can) : null}</div>{side(e, c, st, can && ev)}</div></div>;
}
