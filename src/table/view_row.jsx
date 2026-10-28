/* table/view_row.jsx: Full details of one record (row click): every schema field (grouped by the schema's sec categories),
   values unclipped; Edit + Delete for managers */
import { cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db, cur } from '../store/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { label, cell } from '../ui/index.js';
import { modal } from '../overlays/index.js';
import { kv_table } from './kv_table.jsx';

export function view_row(c, id) {
  const s = schemas[c], r = db.find(c, id), can = auth.can(cur[c]?.mod, 2), k0 = s.cols[0];
  if (!r) return notify('It may have been deleted in another tab. Refresh the list and try again.', 'bad', 'Record not found');
  const sec = Object.entries(s.sec || {}).map(([g, ks]) => [g, ks.split(',')]), seen = new Set(sec.flatMap(([, ks]) => ks)), rest = s.f.map(f => f.k).filter(k => !seen.has(k));
  const groups = [...(rest.length ? [[sec.length ? 'Other' : '', rest]] : []), ...sec].map(([g, ks]) => [g, ks.map(k => [label(c, k), cell(c, k, r)])]);
  if (rest.length && sec.length) groups.push(groups.shift());
