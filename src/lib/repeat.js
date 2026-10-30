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
