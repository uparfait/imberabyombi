/* table/col_show.js: Show or hide one column: its cells fade, then the table redraws without (or with) it.
   The header cell stays in the table (hidden); the body cells are left out while the column is hidden. */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { reduced } from '../feedback/index.js';
import { refresh } from './rows.js';

export function col_show(c, k, on) {
  const th = qs(`#table_${c} th[data-k="${k}"]`), cells = () => qsa(`#table_${c} [data-k="${k}"]`);
  if (on) { if (th) th.hidden = false; refresh(c);
    if (!reduced()) cells().forEach(e => e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' })); return; }
