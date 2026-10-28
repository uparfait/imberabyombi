/* schemas/fields.js: SCHEMAS building blocks. field_spec(key, label, type, options, required, extra) describes one form
   field; option_list('A|B') splits choices; status lists, departments, grades…; people pickers and seed-data helpers. */
import { cfg } from '../config/index.js';
import { pad, uniq, lorem } from '../lib/index.js';
import { db } from '../store/index.js';

export const field_spec = (k, l, t = 'text', o = null, req = false, x = {}) => ({ k, l, t, o, req, ...x });
export const option_list = s => s.split('|');
export const STATUS = {
