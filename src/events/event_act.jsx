/* events/event_act.jsx: EV_ACT, the event page's buttons: edit one section, postpone (a new date, or none yet, and a
   reason), cancel (with a reason), back on schedule, mark as completed, stop repeating, duplicate and delete. They change
   the event's status (Scheduled, Postponed, Cancelled, Completed); where it stands follows (ev_state). */
import { tz_parts, pad } from '../lib/index.js';
