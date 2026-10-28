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
