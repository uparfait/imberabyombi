/* lib/dates.js: TINY UTILITIES for dates and times: local yyyy-mm-dd / hh:mm strings, day maths, display formats,
   the 24-hour / 12-hour clock setting and ISO weeks. */
import { pad } from './text.js';
/* db straight from its file (not the store barrel): the barrel also loads app_state, which needs these helpers first */
import { db } from '../store/db.js';

export const ymd = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const hm = (d = new Date()) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
export const now_dt = (d = new Date()) => `${ymd(d)}T${hm(d)}`;
export const add_d = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
