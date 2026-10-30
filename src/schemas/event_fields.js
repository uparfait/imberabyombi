/* schemas/event_fields.js: what activities and events share: their type (Upcoming, Live now, Recurring) and the check
   that their timing makes sense. Choosing Live now fills an empty date and start with the time now. */
import { pad, tz_parts, zoned_to_utc, device_tz } from '../lib/index.js';
