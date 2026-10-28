/* fields/date_formats.js: the date & time formats of text date/time fields (DTF), the clock-aware spec,
   the input props of such a field, and 12-hour ↔ 24-hour conversion for showing stored values. */
import { pad, h24 } from '../lib/index.js';

/* Date & time fields are plain text inputs: type freely (separators are added as you type), or pick from #picker.
   Typing respects the clock chosen in the time picker (h24): 12-hour = 01–12 + AM/PM (type "a" or "p"), 24-hour = 00–23.
   A first digit that cannot start a valid value is padded (9 → 09), a digit that would overflow is refused (13 in 12-hour).
   Shown values keep ISO order; saved values are always ISO 24-hour (form_obj): time "HH:MM", date & time "YYYY-MM-DDTHH:MM". */
export const DTF = {
