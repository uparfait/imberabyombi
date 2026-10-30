/* calendar_items.jsx: what the calendars show (activities, events, your tasks on their due day), the task chip they draw,
   and the sidebar mini calendar; mini_draw() pages it in place (only #date_mini redraws, not the page). Activities and
   events carry the time zone they were set in (tz); they show converted to the page's (Settings), day included. */
import { ymd, add_d, parse_d, fmt_d, fmt_dt, add_time, convert, page_tz } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db, ui } from '../store/index.js';
import { auth, me } from '../auth/index.js';
import { countdown } from '../modules/index.js';
import { redraw_slot } from './live_slot.jsx';

/* a record's date and times on the page's clock (records with no tz were set in the page's zone) */
const here = r => { const tz = r.tz || page_tz(), to = page_tz(), a = convert(r.date, r.start || '09:00', tz, to);
  return { date: a.date, start: a.time, end: r.end ? convert(r.date, r.end, tz, to).time : add_time(a.time, 120) }; };
const event_item = e => ({ id: e.id, title: e.title, ...here(e), c: 'events', tone: 'ink' });
const task_item = t => ({ id: t.id, title: t.title, date: String(t.due).slice(0, 10), due: t.due, all_day: true, c: 'tasks', status: t.status });
export const cal_items = () => [
  ...(auth.can('calendar') ? db.list('activities').map(a => ({ ...a, ...here(a), c: 'activities', tone: 'brand' })) : []),
  ...(auth.can('calendar') || auth.can('events') ? db.list('events').map(event_item) : []),
  /* tasks assigned to you, on their due day (all day): a click opens Tasks with that task highlighted */
  ...(auth.can('tasks') ? db.list('tasks').filter(t => t.assignee === me() && t.due).map(task_item) : [])
];

/* a task on the calendar (all-day row / month cell); keyed by id so callers can map over items */
export const cal_task = i => <button key={i.id} className={`cal_task ${i.status === 'Done' ? 'is_done' : countdown(i.due || i.date).late ? 'is_late' : ''}`}
  data-act="cal_task" data-id={i.id} aria-label={`Task: ${i.title}, due ${fmt_dt(i.due || i.date)}`}>
  {ic('tasks', 'h-3 w-3 shrink-0')}<span className="truncate">{i.title}</span></button>;

const day_cls = (k, td, m, x) => k === td ? 'bg-brand font-semibold text-white' : k === ui.cal_date ? 'bg-brand/15 text-accent'
  : x.getMonth() !== m ? 'text-muted/60 hover:bg-fg/5' : 'text-fg hover:bg-fg/5';

export function mini_cal() {
  const b = parse_d(ui.mini || ui.cal_date), f = new Date(b.getFullYear(), b.getMonth(), 1), s = add_d(f, -f.getDay()), td = ymd();
  const has = new Set(cal_items().map(i => i.date));
  return <div className="px-1"><div className="flex items-center justify-between">
    <p className="date_mini_title pl-3 text-sm font-medium">{f.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
    <div><button className="icon_btn h-8 w-8" data-act="mini" data-n="-1" aria-label="Previous month">{ic('chevL', 'h-4 w-4')}</button>
      <button className="icon_btn h-8 w-8" data-act="mini" data-n="1" aria-label="Next month">{ic('chevR', 'h-4 w-4')}</button></div></div>
  <div className="date_mini_grid mt-1 grid grid-cols-7 text-center text-[0.6875rem] text-muted">
    {'SMTWTFS'.split('').map((x, i) => <span key={'w' + i} className="py-1" aria-hidden="true">{x}</span>)}
    {Array.from({ length: 42 }, (_, i) => { const x = add_d(s, i), k = ymd(x);
