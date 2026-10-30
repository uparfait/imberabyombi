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
