/* fields/repeat_field.jsx: how a recurring activity or event repeats (field type 'repeat', shown while its type is
   Recurring): how often and every how many, on which weekdays (weekly), in which months (yearly), on which dates or which
   weeks of the month (monthly and yearly), and when it stops (never, on a date, after a number of times). The rule in
   words shows under it and follows every change (repeat_say). repeat_from(form) reads the rule (lib/repeat.js). */
import { REPEAT_NEW, DAY_NAMES, MONTH_NAMES, WEEK_NAMES, repeat_text, cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { dt_attrs } from './date_formats.js';

const FREQS = [['daily', 'Daily'], ['weekdays', 'Every weekday (Mon–Fri)'], ['weekly', 'Weekly'], ['monthly', 'Monthly'], ['yearly', 'Yearly']];
const UNIT = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' };
const MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
const BY_HELP = 'Dates: on days of the month, such as the 1st and the 15th. Weeks: on weekdays of chosen weeks, such as the second and the last Friday.';
const END_HELP = 'Never: it repeats until you delete it. On a date: it stops after that day. After: it stops once it has happened that many times.';

/* the rule in the form; lists left empty mean "as on the first date" */
export function repeat_from(f) {
  const v = n => f.elements[n]?.value ?? '', all = n => [...f.querySelectorAll(`[name=${n}]:checked`)].map(i => +i.value);
  const r = { freq: v('rp_freq') || 'weekly', every: Math.min(99, Math.max(1, +v('rp_every') || 1)), end: v('rp_end') || 'never' };
  if (r.freq === 'weekly') r.days = all('rp_days');
  if (r.freq === 'yearly') r.months = all('rp_months');
  if (r.freq === 'monthly' || r.freq === 'yearly') Object.assign(r, v('rp_by') === 'week' ? { by: 'week', weeks: all('rp_weeks'), wdays: all('rp_wdays') } : { by: 'date', dates: all('rp_dates') });
  if (r.end === 'on') r.until = v('rp_until');
  if (r.end === 'after') r.count = Math.min(999, Math.max(1, +v('rp_count') || 1));
  return r;
}
/* the unit after "Every" (week / weeks) and the rule in words follow the form */
export function repeat_say(f) {
  const box = f?.querySelector('[data-repeat]'); if (!box) return; const r = repeat_from(f);
  box.querySelector('[data-rp-unit]').textContent = UNIT[r.freq] ? UNIT[r.freq] + (r.every > 1 ? 's' : '') : '';
  box.querySelector('[data-rp-sum]').textContent = repeat_text(r, f.elements.date?.value);
