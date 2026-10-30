/* events/ev_state.js: where an event stands now (its category on the Events page and its badge): Cancelled or Postponed
   (its status), Past once it is completed or over, Live while it runs (a recurring one on one of its days too),
   Recurring while a series still has days to come, Upcoming before it starts. Older statuses read as their new ones. */
import { pad, tz_parts, repeat_next, page_tz } from '../lib/index.js';
import { at } from '../schemas/index.js';

export const EV_STATES = ['Live', 'Upcoming', 'Recurring', 'Postponed', 'Cancelled', 'Past'];
const DONE = ['Completed', 'Done', 'Closed'];
const HOURS_2 = 2 * 3600e3;   /* an event with no end time lasts two hours */

/* running on day date: started and not ended */
const runs = (e, date, now) => { const s = at(date, e.start, e.tz), end = e.end ? at(date, e.end, e.tz) : s + HOURS_2; return now >= s && now < end; };

export function ev_state(e, now = Date.now()) {
  if (e.status === 'Cancelled' || e.status === 'Postponed') return e.status;
  if (DONE.includes(e.status) || !e.date) return e.date ? 'Past' : 'Upcoming';
  if (e.kind === 'Recurring' && e.repeat) {
    const p = tz_parts(e.tz || page_tz(), now), today = `${p.y}-${pad(p.mo)}-${pad(p.d)}`, next = repeat_next(e.repeat, e.date, today);
