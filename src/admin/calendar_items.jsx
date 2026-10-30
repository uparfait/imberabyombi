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
