/* lib/dates.js: TINY UTILITIES for dates and times: yyyy-mm-dd / hh:mm strings (today and now on the page's time zone,
   tz.js), day maths, display formats, the 24-hour / 12-hour clock setting and ISO weeks. */
import { pad } from './text.js';
/* db straight from its file (not the store barrel): the barrel also loads app_state, which needs these helpers first */
import { db } from '../store/db.js';
import { page_now } from './tz.js';

export const ymd = (d = page_now()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const hm = (d = page_now()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
export const now_dt = (d = page_now()) => `${ymd(d)}T${hm(d)}`;
export const add_d = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const parse_d = s => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
export const fmt_d = s => s ? parse_d(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
export const fmt_dt = s => !s ? '—' : /T\d/.test(s) ? `${fmt_d(s)}, ${fmt_time(String(s).slice(11, 16))}` : fmt_d(s);   /* a bare date shows as just the date */
export const to_min = t => { const [h, m] = String(t || '0:0').split(':').map(Number); return (h || 0) * 60 + (m || 0); };
export const add_time = (t, mins) => { const v = Math.min(to_min(t) + mins, 23 * 60 + 59); return `${pad(Math.floor(v / 60))}:${pad(v % 60)}`; };
/* Clock format: 24-hour or 12-hour (toggle in the time picker, saved as "h24"; default follows the locale) */
export const h24 = () => db.get('h24', !new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12);
export const fmt_hour = h => h24() ? `${pad(h)}:00` : new Date(2000, 0, 1, h).toLocaleTimeString(undefined, { hour: 'numeric', hour12: true });
