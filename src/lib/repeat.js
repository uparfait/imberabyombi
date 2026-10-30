/* lib/repeat.js: repeat rules (recurring activities and events) and the days they fall on. A rule:
   { freq: 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'yearly', every: n (each n days, weeks, months or years),
     days: weekdays for weekly (0 Sunday … 6 Saturday), months: 1–12 for yearly,
     by: 'date' (dates: 1–31, -1 = the last day) or 'week' (weeks: 1–4, -1 = the last; wdays: weekdays) for monthly and yearly,
     end: 'never' | 'on' (until 'YYYY-MM-DD') | 'after' (count times) }.
   An empty list means "as on the first date" (weekly from a Friday: on Fridays). */
import { ymd, add_d, parse_d } from './dates.js';

export const REPEAT_NEW = { freq: 'weekly', every: 1, days: [], by: 'date', dates: [], weeks: [], wdays: [], months: [], end: 'never', until: '', count: 10 };
const days_between = (a, b) => Math.round((b - a) / 864e5);
const monday = d => add_d(d, -((d.getDay() + 6) % 7));
const month_days = d => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
const nth = d => Math.ceil(d.getDate() / 7);   /* the first … fifth of its weekday in the month */
const or = (xs, x) => xs?.length ? xs : [x];
/* the weeks and weekdays a first date stands for: the 2nd Friday; a 5th one is the last */
export const week_of = f => ({ weeks: [nth(f) > 4 ? -1 : nth(f)], wdays: [f.getDay()] });

/* monthly and yearly: the day in the month (dates, or nth weekdays) */
const in_month = (r, d, f) => r.by === 'week'
  ? or(r.wdays, f.getDay()).includes(d.getDay()) && or(r.weeks, week_of(f).weeks[0]).some(w => w === -1 ? d.getDate() + 7 > month_days(d) : nth(d) === w)
  : or(r.dates, f.getDate()).some(x => x === -1 ? d.getDate() === month_days(d) : d.getDate() === x);

/* does rule r (first date f) fall on day d? */
export function repeat_hit(r, d, f) {
  const n = Math.max(1, +r.every || 1), months = (d.getFullYear() - f.getFullYear()) * 12 + d.getMonth() - f.getMonth();
  if (r.freq === 'daily') return days_between(f, d) % n === 0;
  if (r.freq === 'weekdays') return d.getDay() % 6 !== 0;
  if (r.freq === 'weekly') return or(r.days, f.getDay()).includes(d.getDay()) && (days_between(monday(f), monday(d)) / 7) % n === 0;
  if (r.freq === 'monthly') return months % n === 0 && in_month(r, d, f);
  if (r.freq === 'yearly') return (d.getFullYear() - f.getFullYear()) % n === 0 && or(r.months, f.getMonth() + 1).includes(d.getMonth() + 1) && in_month(r, d, f);
  return false;
}

/* the days ('YYYY-MM-DD') rule r with first date first falls on from 'from' to 'to' (both included), until it ends */
export function repeat_dates(r, first, from, to) {
  if (!r || !/^\d{4}-\d{2}-\d{2}$/.test(first || '')) return [];
  const f = parse_d(first), last = r.end === 'on' && r.until && r.until < to ? r.until : to, max = r.end === 'after' ? Math.max(1, +r.count || 1) : Infinity;
  const out = []; let n = 0, d = max < Infinity || from <= first ? f : parse_d(from);   /* counting starts at the first date */
  for (let i = 0; ymd(d) <= last && n < max && i < 40000; d = add_d(d, 1), i++) {
