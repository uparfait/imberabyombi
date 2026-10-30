/* lib/repeat_words.js: a repeat rule (lib/repeat.js) in plain words: "Every 2 weeks on Monday and Wednesday, until
   December 31, 2026", "Every month on the last Friday, 10 times", "Every year in March and June on the 15th". */
import { parse_d } from './dates.js';
import { week_of } from './repeat.js';

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const WEEK_NAMES = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', [-1]: 'last' };
/* "a", "a and b", "a, b and c" */
export const and_list = xs => xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`;
/* 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st */
export const ordinal = n => n + (n % 100 > 10 && n % 100 < 14 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
const sorted = (xs, key = x => x) => [...xs].sort((a, b) => key(a) - key(b));
const mon_first = d => (d + 6) % 7;   /* the week starts on Monday */

/* the day in the month: "on the 1st and 15th", "on the last day", "on the second and last Friday" */
function month_day(r, f) {
  if (r.by === 'week') { const w = r.weeks?.length ? r.weeks : f && week_of(f).weeks, wd = r.wdays?.length ? r.wdays : f && [f.getDay()];
    return w && wd ? ` on the ${and_list(sorted(w, x => x === -1 ? 9 : x).map(x => WEEK_NAMES[x]))} ${and_list(sorted(wd, mon_first).map(x => DAY_NAMES[x]))}` : ''; }
  const ds = r.dates?.length ? r.dates : f && [f.getDate()];
  return ds ? ` on the ${and_list(sorted(ds, x => x === -1 ? 99 : x).map(x => x === -1 ? 'last day' : ordinal(x)))}` : '';
}

/* rule r whose first date is first ('YYYY-MM-DD', may be empty) in words */
export function repeat_text(r, first) {
  if (!r) return '';
  const f = /^\d{4}-\d{2}-\d{2}$/.test(first || '') ? parse_d(first) : null, n = Math.max(1, +r.every || 1);
  const every = unit => n === 1 ? `Every ${unit}` : `Every ${n} ${unit}s`;
  let s = r.freq === 'daily' ? every('day') : r.freq === 'weekdays' ? 'Every weekday (Monday to Friday)' : '';
  if (r.freq === 'weekly') { const ds = r.days?.length ? r.days : f && [f.getDay()]; s = every('week') + (ds ? ` on ${and_list(sorted(ds, mon_first).map(x => DAY_NAMES[x]))}` : ''); }
  if (r.freq === 'monthly') s = every('month') + month_day(r, f);
  if (r.freq === 'yearly') { const ms = r.months?.length ? r.months : f && [f.getMonth() + 1];
