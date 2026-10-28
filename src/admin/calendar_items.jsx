/* calendar_items.jsx: what the calendars show (activities, events, your tasks on their due day), the task chip they draw,
   and the sidebar mini calendar; mini_draw() pages it in place (the reference swapped #date-mini's innerHTML). */
import { ymd, add_d, parse_d, fmt_d, fmt_dt, add_time } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db, ui } from '../store/index.js';
import { auth, me } from '../auth/index.js';
import { countdown } from '../modules/index.js';
import { redraw_slot } from './live_slot.jsx';

const event_item = e => ({ id: e.id, title: e.title, date: e.date, start: e.start || '09:00', end: add_time(e.start || '09:00', 120), c: 'events', tone: 'ink' });
const task_item = t => ({ id: t.id, title: t.title, date: String(t.due).slice(0, 10), due: t.due, all_day: true, c: 'tasks', status: t.status });
export const cal_items = () => [
  ...(auth.can('calendar') ? db.list('activities').map(a => ({ ...a, c: 'activities', tone: 'brand' })) : []),
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
