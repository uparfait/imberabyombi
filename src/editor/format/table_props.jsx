/* editor/format/table_props.jsx: the "Table properties" dialog: rows, columns, border width and colour, cell padding,
   vertical alignment, width and position, header row, striped rows, equal column widths (one undo step on Apply). */
import { modal } from '../../overlays/index.js';
import { clamp, to_hex, toast } from '../core/index.js';
import { can_edit } from './commands.js';
import { chain_rows, table_width_cols, insert_rows, insert_cols, delete_col } from './table_model.js';
import { table_ctx, table_chain, tbl_op } from './table_ops.js';
import { num_field, num_props, sel_field, color_field, check_field, POSITIONS } from './dialog_fields.jsx';
import { refocus_after_close, previewing } from './guards.js';

const VALIGN = [['top', 'Top'], ['middle', 'Middle'], ['bottom', 'Bottom']];

/* applies the dialog values v to the table parts ch (inside tbl_op('props')) */
const apply_props = (v, n_rows, n_cols) => ch => {
  const rows = chain_rows(ch);
  if (n_rows > rows.length) insert_rows(rows[rows.length - 1], n_rows - rows.length, true); else rows.slice(n_rows).forEach(r => r.remove());
  const alive = ch.filter(t => t.rows.length), w = table_width_cols(alive);
  if (n_cols !== w || v.dist) alive.forEach(t => { const g = t.querySelector(':scope > colgroup'); if (g) g.remove(); });
  if (n_cols > w) insert_cols(alive, w - 1, n_cols - w, 'right'); else for (let k = w; k > n_cols; k--) delete_col(alive, k - 1);
  ch.forEach(t => {
    t.style.setProperty('--bw', v.bw + 'px'); t.style.setProperty('--bc', v.bc); t.style.setProperty('--pad', v.pad + 'pt');
    t.style.width = v.w < 100 ? v.w + '%' : ''; t.style.marginLeft = v.al === 'left' || v.w >= 100 ? '' : 'auto'; t.style.marginRight = v.al === 'center' && v.w < 100 ? 'auto' : '';
    t.toggleAttribute('data-header', v.hdr); t.toggleAttribute('data-striped', v.str);
  });
  chain_rows(ch).forEach(r => Array.from(r.cells).forEach(x => { x.style.verticalAlign = v.va === 'top' ? '' : v.va; }));
};

export function table_props_dialog() {
  if (previewing() || !can_edit()) return;
  const c = table_ctx(); if (!c) { toast('Place the cursor inside a table first'); return; }
  const chain = table_chain(c.table), t0 = chain[0];
  const bw = parseFloat(t0.style.getPropertyValue('--bw')), pad = parseFloat(t0.style.getPropertyValue('--pad'));
  const al = t0.style.marginLeft === 'auto' ? (t0.style.marginRight === 'auto' ? 'center' : 'right') : 'left';
  modal({
    title: 'Table properties', submit: 'Apply',
    body: <>
      {num_field('tp_rows', 'Rows', num_props(chain_rows(chain).length, 1, 500))}
      {num_field('tp_cols', 'Columns', num_props(table_width_cols(chain), 1, 30))}
      {num_field('tp_bw', 'Border width (px)', num_props(isNaN(bw) ? 1 : bw, 0, 10, 0.5))}
