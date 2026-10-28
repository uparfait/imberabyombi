/* fields/date_formats.js: the date & time formats of text date/time fields (DTF), the clock-aware spec,
   the input props of such a field, and 12-hour ↔ 24-hour conversion for showing stored values. */
import { pad, h24 } from '../lib/index.js';

/* Date & time fields are plain text inputs: type freely (separators are added as you type), or pick from #picker.
   Typing respects the clock chosen in the time picker (h24): 12-hour = 01–12 + AM/PM (type "a" or "p"), 24-hour = 00–23.
   A first digit that cannot start a valid value is padded (9 → 09), a digit that would overflow is refused (13 in 12-hour).
   Shown values keep ISO order; saved values are always ISO 24-hour (form_obj): time "HH:MM", date & time "YYYY-MM-DDTHH:MM". */
export const DTF = {
  date: { ph: 'YYYY-MM-DD', re: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])', mask: '####-##-##', parts: ['y', 'mo', 'd'] },
  time: { ph: 'HH:MM', re: '([01]\\d|2[0-3]):[0-5]\\d', mask: '##:##', parts: ['h', 'mi'] },
  'datetime-local': { ph: 'YYYY-MM-DD HH:MM', re: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]) ([01]\\d|2[0-3]):[0-5]\\d', mask: '####-##-## ##:##', parts: ['y', 'mo', 'd', 'h', 'mi'] },
  month: { ph: 'YYYY-MM', re: '\\d{4}-(0[1-9]|1[0-2])', mask: '####-##', parts: ['y', 'mo'] },
  week: { ph: 'YYYY-Www', re: '\\d{4}-W(0[1-9]|[1-4]\\d|5[0-3])', mask: '####-W##', parts: ['y', 'w'] }
};
export const H12 = ' (AM|PM)';
const H12_RE = '(0[1-9]|1[0-2]):[0-5]\\d';
/* The spec in effect: time fields switch to "HH:MM AM" in 12-hour mode */
export const dt_spec = t => { const s = DTF[t]; if (h24() || !/time/.test(t)) return s;
  return { ...s, ph: s.ph + ' AM', re: s.re.replace('([01]\\d|2[0-3]):[0-5]\\d', H12_RE) + H12, max: s.mask.length + 3 }; };
/* The props of a text date/time input, spread on it: <input {...dt_attrs('date')} /> (the reference returned an attribute string) */
