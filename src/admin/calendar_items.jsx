/* calendar_items.jsx: what the calendars show (activities, events, your tasks on their due day), the task chip they draw,
   and the sidebar mini calendar; mini_draw() pages it in place (the reference swapped #date-mini's innerHTML). */
import { ymd, add_d, parse_d, fmt_d, fmt_dt, add_time } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db, ui } from '../store/index.js';
import { auth, me } from '../auth/index.js';
import { countdown } from '../modules/index.js';
