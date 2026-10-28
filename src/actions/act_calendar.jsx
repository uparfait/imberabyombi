/* actions/act_calendar.jsx: data-act handlers of the calendar: today, previous / next week or month, the sidebar mini
   calendar (pages and slides in place), a day, an empty hour slot (new activity), an event. */
import { qs, ymd, pad, add_d, parse_d, fmt_d } from '../lib/index.js';
import { ui, db, route, rerender } from '../store/index.js';
