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
  const c = table_ctx(); if (!c) { toast('Place the cursor inside a table first'); return; }
  op = String(op).replace(/[A-Z]/g, ch => '_' + ch.toLowerCase());
  begin_op();
  const chain = table_chain(c.table), slot = row_slots(c.tr).find(x => x.cell === c.td) || { start: 0, end: 0 };
  const drop_cols = () => chain.forEach(t => { const g = t.querySelector(':scope > colgroup'); if (g) g.remove(); });
  let target = null, full = false;
  switch (op) {
    case 'row_above': case 'row_below': target = cell_at_col(insert_rows(c.tr, arg || 1, op === 'row_below'), slot.start); break;
    case 'col_left': drop_cols(); insert_cols(chain, slot.start, arg || 1, 'left'); target = cell_at_col(c.tr, slot.start); break;
    case 'col_right': drop_cols(); insert_cols(chain, slot.end, arg || 1, 'right'); target = cell_at_col(c.tr, slot.end + 1); break;
    case 'del_row': { const nx = c.tr.nextElementSibling || c.tr.previousElementSibling; c.tr.remove(); target = nx && nx.cells[0]; full = true; break; }
    case 'del_col': drop_cols(); delete_col(chain, slot.start); full = true; break;
    case 'del_table': target = chain[chain.length - 1].nextElementSibling; chain.forEach(t => t.remove()); full = true; break;
    case 'merge': {
      const nx = c.td.nextElementSibling; if (!nx) { toast('There’s no cell to the right to merge with'); break; }
      if (nx.textContent.replace(/\u200b/g, '').trim() || nx.querySelector('img,table')) Array.from(nx.childNodes).forEach(n => c.td.appendChild(n));
      c.td.colSpan = (c.td.colSpan || 1) + (nx.colSpan || 1); nx.remove(); target = c.td; break;
    }
    case 'split': {
      const n = c.td.colSpan || 1; if (n < 2) { toast('This cell isn’t merged'); break; }
      c.td.removeAttribute('colspan'); for (let k = 1; k < n; k++) c.td.after(new_cell_like(c.td)); target = c.td; break;
    }
    case 'cell_bg': sel_cells(c).forEach(x => { x.style.backgroundColor = arg || ''; x.removeAttribute('data-autobg'); }); break;
    case 'valign': sel_cells(c).forEach(x => { x.style.verticalAlign = arg === 'top' ? '' : arg; }); break;
    case 'border': chain.forEach(t => t.style.setProperty('--bw', arg + 'px')); break;
    case 'border_color': chain.forEach(t => t.style.setProperty('--bc', arg || '#000000')); break;
    case 'header': { const on = !chain[0].hasAttribute('data-header'); chain.forEach(t => t.toggleAttribute('data-header', on)); break; }
    case 'striped': { const on = !chain[0].hasAttribute('data-striped'); chain.forEach(t => t.toggleAttribute('data-striped', on)); break; }
    case 'preset': apply_preset(chain, arg); break;
    case 'distribute': drop_cols(); break;
    case 'props': arg(chain); full = true; break;
  }
  chain.forEach(t => { if (t.isConnected && !t.rows.length) t.remove(); });
  const alive = chain.filter(t => t.isConnected); if (alive.length) restyle_table(alive);
  if (!target && !c.td.isConnected && alive.length) target = alive[0].rows[0] && alive[0].rows[0].cells[0];
