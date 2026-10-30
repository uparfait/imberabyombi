/* events/ev_state.js: where an event stands now (its category on the Events page and its badge): Cancelled or Postponed
   (its status), Past once it is completed or over, Live while it runs (a recurring one on one of its days too),
   Recurring while a series still has days to come, Upcoming before it starts. Older statuses read as their new ones. */
import { pad, tz_parts, repeat_next, page_tz } from '../lib/index.js';
import { at } from '../schemas/index.js';
