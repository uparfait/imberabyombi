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
