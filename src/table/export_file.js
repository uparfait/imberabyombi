/* table/export_file.js: Export (every table): CSV, JSON or Excel (XML spreadsheet). The rows follow the table's filters
   (the dialog's filters replace the table's own for those columns) and the date range, on the table's first date column. */
import { cap, ymd, dl } from '../lib/index.js';
import { ui } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { role_name } from '../auth/index.js';
import { notify } from '../feedback/index.js';
import { rows_of } from './rows.js';

export const EXPORTS = [['csv', 'CSV', 'file'], ['json', 'JSON', 'note'], ['xls', 'Excel', 'grid']];
export const date_key = c => schemas[c].f.find(f => /^date/.test(f.t))?.k;

/* cols: [[key, name in the file], …] · from, to: ISO date or date-time ('' = open) · flt: { column: value } */
export function export_file(c, fmt, cols, from, to, flt = {}) {
  const dk = date_key(c), name = EXPORTS.find(x => x[0] === fmt)?.[1] || 'CSV';
  /* the dialog's filters replace the table's own for those columns */
  const q0 = ui.q[c]; ui.q[c] = { ...q0, ...flt }; let rows; try { rows = rows_of(c); } finally { ui.q[c] = q0; }
  if (to && to.length === 10) to += 'T23:59';   /* a bare To date covers that whole day */
  /* a row with only a date is compared by day */
  if (dk && (from || to)) rows = rows.filter(r => { const v = String(r[dk] || '').slice(0, 16), day = v.length <= 10, cut = s => day ? s.slice(0, 10) : s;
    return v && (!from || v >= cut(from)) && (!to || v <= cut(to)); });
  const val = (r, k) => Array.isArray(r[k]) ? r[k].map(x => x?.t ?? x?.name ?? x).join('; ') : k === 'role' ? role_name(r[k]) : r[k] ?? '';
