/* events/conflicts.js: activities and events that clash with one being saved: the same venue or the same organiser at an
   overlapping time. Times are compared as instants, each in its own time zone (9:00 in Kigali is 8:00 in London). A
   recurring one is compared on each of its days for six months. Cancelled events and dates not set yet are left out.
   clash_ok(): the form says what it overlaps; saving again with the same timing keeps it anyway. */
import { repeat_dates, ymd, add_d, parse_d, fmt_d, fmt_time, zone_short, page_tz } from '../lib/index.js';
import { db } from '../store/index.js';
import { show_msg } from '../feedback/index.js';
import { at } from '../schemas/event_fields.js';
