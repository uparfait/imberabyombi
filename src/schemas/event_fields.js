/* schemas/event_fields.js: what activities and events share: their type (Upcoming, Live now, Recurring) and the check
   that their timing makes sense. Choosing Live now fills an empty date and start with the time now. */
import { pad, tz_parts, zoned_to_utc, device_tz } from '../lib/index.js';
import { show_err } from '../feedback/index.js';
import { set_native_value } from '../fields/form_values.js';
import { dt_show } from '../fields/date_formats.js';
import { field_spec } from './fields.js';

export const KINDS = [['Upcoming', 'Upcoming'], ['Live', 'Live now'], ['Recurring', 'Recurring']];
const KIND_HELP = 'Upcoming: it starts later. Live now: it has already started, so its date and start time are filled in with '
  + 'the time now (change them if it started earlier). Recurring: it repeats on a schedule you choose.';

/* Live now: an empty date and start become the time now, in the form's time zone */
const live_now = f => { const tz = f.elements.tz?.value || device_tz(), p = tz_parts(tz, Date.now());
  for (const [k, v] of [['date', `${p.y}-${pad(p.mo)}-${pad(p.d)}`], ['start', `${pad(p.h)}:${pad(p.mi)}`]]) {
