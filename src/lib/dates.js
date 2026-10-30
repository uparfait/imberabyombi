/* lib/dates.js: TINY UTILITIES for dates and times: yyyy-mm-dd / hh:mm strings (today and now on the page's time zone,
   tz.js), day maths, display formats, the 24-hour / 12-hour clock setting and ISO weeks. */
import { pad } from './text.js';
/* db straight from its file (not the store barrel): the barrel also loads app_state, which needs these helpers first */
import { db } from '../store/db.js';
import { page_now } from './tz.js';

export const ymd = (d = page_now()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
