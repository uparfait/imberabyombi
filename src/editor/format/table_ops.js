/* editor/format/table_ops.js: the table under the caret (table_ctx), the parts of a table split across pages
   (table_chain), the selected cells, and tbl_op(op, arg): every table command as one undo step. */
import { qsa, el_of, editable_of, bodies, is_table, last_range, caret_to_start, body_index, toast, begin_op, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
import { insert_block_at_caret } from './insert.js';
import { build_table, apply_preset, restyle_table, row_slots, cell_at_col, new_cell_like, insert_rows, insert_cols, delete_col } from './table_model.js';

export function insert_table(rows, cols) { const t = insert_block_at_caret(build_table(rows, cols)); if (!t) return; end_op(body_index(editable_of(t))); caret_to_start(t.rows[0].cells[0]); }
/* { td, tr, table, host } of the cell holding the caret, or null */
export function table_ctx() {
  const r = last_range; if (!r || !r.startContainer.isConnected) return null;
  const host = editable_of(r.startContainer); if (!host || !host.classList.contains('pg_body')) return null;
  const td = el_of(r.startContainer).closest('td,th'); if (!td || !host.contains(td)) return null;
  return { td, tr: td.parentElement, table: td.closest('table'), host };
}
/* every part of table t, first to last */
export function table_chain(t) {
  const bs = bodies(); let first = t;
  while (first.hasAttribute('data-cont')) {
    const b = editable_of(first), i = bs.indexOf(b); if (i <= 0 || b.firstElementChild !== first) break;
    const p = bs[i - 1].lastElementChild; if (is_table(p)) first = p; else break;
  }
  const chain = [first]; let cur = first;
  while (true) {
    const b = editable_of(cur), i = bs.indexOf(b); if (b.lastElementChild !== cur) break;
    const nb = bs[i + 1], f = nb && nb.firstElementChild;
    if (is_table(f) && f.hasAttribute('data-cont')) { chain.push(f); cur = f; } else break;
  }
  return chain;
}
export function sel_cells(c) { const r = last_range; const cells = r && !r.collapsed ? qsa('td,th', c.table).filter(x => r.intersectsNode(x)) : []; return cells.length ? cells : [c.td]; }
/* op (snake_case; the source's camelCase names work too): row_above, row_below, col_left, col_right (arg: how many),
   del_row, del_col, del_table, merge, split, cell_bg / border_color (arg: colour or null), valign (top|middle|bottom),
   border (px), header, striped (toggles), preset (key), distribute (equal widths), props (arg: fn(chain)) */
export function tbl_op(op, arg) {
  if (!can_edit()) return;
