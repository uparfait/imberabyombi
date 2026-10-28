/* calendar_items.jsx: what the calendars show (activities, events, your tasks on their due day), the task chip they draw,
   and the sidebar mini calendar; mini_draw() pages it in place (the reference swapped #date-mini's innerHTML). */
import { ymd, add_d, parse_d, fmt_d, fmt_dt, add_time } from '../lib/index.js';
