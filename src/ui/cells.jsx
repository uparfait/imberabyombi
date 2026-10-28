/* ui/cells.jsx: table cell renderers (progress, stock meter, the default cell of a schema column),
   column labels, the searchable text of a value and the <option> list of a schema field. */
import { cap, fmt_d, fmt_dt, money } from '../lib/index.js';
import { role_name } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { TONE, badge, tag, person, dash } from './badges.jsx';

export const bar_cell = (v, max) => (
  <div className="flex min-w-[9rem] items-center gap-2">
    <progress max={+max || 1} value={+v || 0} aria-label={`${+v || 0} of ${+max || 0}`}></progress>
    <span className="text-xs tabular-nums text-muted">{`${+v || 0}/${+max || 0}`}</span>
  </div>
);
export const stock_cell = (v, r) => (
  <div className="min-w-[9rem]">
    <div className="flex justify-between text-xs"><b>{+v}</b><span className="text-muted">{`min ${+r.min || 0}`}</span></div>
    <meter className="mt-1" min="0" max={Math.max((+r.min || 1) * 3, +v)} low={+r.min || 0} high={(+r.min || 0) * 2} optimum={Math.max((+r.min || 1) * 3, +v)} value={+v}></meter>
  </div>
);
export const label = (c, k) => schemas[c].f.find(f => f.k === k)?.l || cap(k);
/* Searchable text of a value (what the column filters match against) */
export const plain = (c, k, r) => { const v = r[k], t = schemas[c].f.find(f => f.k === k)?.t; return v == null || v === '' ? '' : Array.isArray(v) ? v.map(x => x?.t ?? x?.name ?? x).join('; ') : k === 'role' ? role_name(v) : t === 'date' ? `${v} ${fmt_d(v)}` : t === 'datetime-local' ? `${v} ${fmt_dt(v)}` : String(v); };
/* <option> tags for a schema field ([value, label] pairs or plain strings).
   React selects through the <select>: give it defaultValue={String(v ?? '')} (the reference marked the option selected). */
export const options = f => (typeof f.o === 'function' ? f.o() : f.o || []).map((o, i) => {
  const [ov, ol] = Array.isArray(o) ? o : [o, o];
  return <option key={i} value={ov}>{ol}</option>;
});
export function cell(c, k, row) {
  const s = schemas[c], v = row[k], f = s.f.find(x => x.k === k);
  if (s.r?.[k]) return s.r[k](v, row);
  if (k === 'role') return <span className="chip bg-brand/10 text-accent">{role_name(v)}</span>;
