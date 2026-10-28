/* actions/act_calendar.jsx: data-act handlers of the calendar: today, previous / next week or month, the sidebar mini
   calendar (pages and slides in place), a day, an empty hour slot (new activity), an event. */
import { qs, ymd, pad, add_d, parse_d, fmt_d } from '../lib/index.js';
import { ui, db, route, rerender } from '../store/index.js';
import { auth } from '../auth/index.js';
import { modal, slide_in } from '../overlays/index.js';
import { open_form } from '../table/index.js';
import { cal_go } from '../modules/index.js';
import { mini_draw } from '../admin/index.js';

export const CALENDAR_ACT = {
