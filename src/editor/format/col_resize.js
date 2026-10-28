/* editor/format/col_resize.js: column resizing by dragging the border between two cells. The widths live in a <colgroup>
   of % widths copied to every part of a table split across pages. install_format() adds the hover detection (the
   col_resize cursor on body) and the mousedown that starts a drag; it returns the cleanup. */
import { state, pages_el, el, begin_op, end_op, body_index, editable_of } from '../core/index.js';
import { table_chain } from './table_ops.js';

/* { table, ci } while the pointer is on the border right of column ci, else null */
export let col_hover = null;
export function set_col_hover(h) { col_hover = h; document.body.classList.toggle('col_resize', !!h); }
export function ensure_colgroup(t, chain) {
  let cg = t.querySelector(':scope > colgroup');
  const n = Math.max(1, ...Array.from(t.rows).map(r => Array.from(r.cells).reduce((a, c) => a + (c.colSpan || 1), 0)));
  if (!cg || cg.children.length !== n) {
    const tw = t.offsetWidth || 1, first = t.rows[0];
    const ws = first && first.cells.length === n ? Array.from(first.cells).map(c => c.offsetWidth / tw * 100) : Array(n).fill(100 / n);
    cg = el('colgroup'); ws.forEach(w => cg.appendChild(el('col', { style: `width:${w.toFixed(3)}%` })));
