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
    chain.forEach(tb => { const o = tb.querySelector(':scope > colgroup'); if (o) o.remove(); tb.insertBefore(cg.cloneNode(true), tb.firstChild); });
  }
  return t.querySelector(':scope > colgroup');
}
let drag_stop = null;   /* ends a drag in progress (also run by the cleanup) */
export function start_col_drag(e) {
  const { table, ci } = col_hover; const chain = table_chain(table); const cg = ensure_colgroup(table, chain);
  const tw = table.offsetWidth, widths = Array.from(cg.children).map(c => parseFloat(c.style.width) / 100 * tw);
  begin_op(); const sx = e.clientX;
  const move = ev => {
    const dx = (ev.clientX - sx) / state.zoom; let a = widths[ci] + dx, b = widths[ci + 1] - dx;
    if (a < 24) { b -= 24 - a; a = 24; } if (b < 24) { a -= 24 - b; b = 24; }
    const nw = widths.slice(); nw[ci] = a; nw[ci + 1] = b;
    chain.forEach(t => { const g = t.querySelector(':scope > colgroup'); g && Array.from(g.children).forEach((c, k) => { c.style.width = (nw[k] / tw * 100).toFixed(3) + '%'; }); });
  };
  const up = () => {
    removeEventListener('mousemove', move); removeEventListener('mouseup', up); drag_stop = null;
    document.body.classList.remove('col_resize'); col_hover = null; if (table.isConnected) end_op(body_index(editable_of(table)));
  };
  addEventListener('mousemove', move); addEventListener('mouseup', up); drag_stop = up;
}
/* the pointer within 4px of a cell's inner border (not the table's outer edges) */
function on_hover(e) {
  if (state.mode !== 'edit' || e.buttons) return;
  const t = e.target, cell = pages_el && pages_el.contains(t) && t.closest('.pg_body td, .pg_body th'); let h = null;
  if (cell) {
    const r = cell.getBoundingClientRect(), row = cell.parentElement;
    if (Math.abs(e.clientX - r.right) <= 4 && cell !== row.cells[row.cells.length - 1]) h = { table: cell.closest('table'), ci: cell.cellIndex };
    else if (Math.abs(e.clientX - r.left) <= 4 && cell.cellIndex > 0) h = { table: cell.closest('table'), ci: cell.cellIndex - 1 };
  }
  if (h || col_hover) set_col_hover(h);
}
/* capture on window: runs before the pages' own mousedown (caret placement), which never sees a resize drag */
function on_down(e) {
  if (e.button !== 0 || !col_hover || !pages_el || !pages_el.contains(e.target)) return;
  e.preventDefault(); e.stopPropagation(); start_col_drag(e);
}
export function install_format() {
  document.addEventListener('mousemove', on_hover);
