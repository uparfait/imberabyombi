/* events/event_act.jsx: EV_ACT, the event page's buttons: edit one section, postpone (a new date, or none yet, and a
   reason), cancel (with a reason), back on schedule, mark as completed, stop repeating, duplicate and delete. They change
   the event's status (Scheduled, Postponed, Cancelled, Completed); where it stands follows (ev_state). */
import { tz_parts, pad } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { schemas, at } from '../schemas/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { open_form } from '../table/index.js';
import { when_row } from '../fields/index.js';
import { go } from '../router/index.js';

const SEC_TITLE = { Details: 'Edit details', When: 'Edit date and time', Location: 'Edit location', Organiser: 'Edit organiser', Audience: 'Edit audience' };
