/* schemas/fields.js: SCHEMAS building blocks. field_spec(key, label, type, options, required, extra) describes one form
   field; option_list('A|B') splits choices; status lists, departments, grades…; people pickers and seed-data helpers. */
import { cfg } from '../config/index.js';
import { pad, uniq, lorem } from '../lib/index.js';
import { db } from '../store/index.js';

export const field_spec = (k, l, t = 'text', o = null, req = false, x = {}) => ({ k, l, t, o, req, ...x });
export const option_list = s => s.split('|');
export const STATUS = {
  staff: option_list('Active|On leave|Inactive'), att: option_list('Present|Late|Absent|Excused'), task: option_list('To do|In progress|Done'),
  prio: option_list('Low|Medium|High'), pay: option_list('Paid|Partial|Unpaid'), rent: option_list('Rented|Returned'),
  res: option_list('Pending|Approved|Rejected'), ev: option_list('Planned|Open|Closed|Done'), park: option_list('Parked|Exited')
};
export const DEPTS = option_list('Teachers|Kitchen|Cleaners|Security|Administration');
export const GRADES = option_list('Grade 1|Grade 2|Grade 3|Grade 4|Grade 5|Grade 6');
export const SUBJECTS = option_list('Mathematics|Languages|Sciences|History|Arts|Sports');
export const TERMS = option_list('Term 1|Term 2|Term 3');
