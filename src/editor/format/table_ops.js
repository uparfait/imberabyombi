/* editor/format/table_ops.js: the table under the caret (table_ctx), the parts of a table split across pages
   (table_chain), the selected cells, and tbl_op(op, arg): every table command as one undo step. */
import { qsa, el_of, editable_of, bodies, is_table, last_range, caret_to_start, body_index, toast, begin_op, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
import { insert_block_at_caret } from './insert.js';
import { build_table, apply_preset, restyle_table, row_slots, cell_at_col, new_cell_like, insert_rows, insert_cols, delete_col } from './table_model.js';

export function insert_table(rows, cols) { const t = insert_block_at_caret(build_table(rows, cols)); if (!t) return; end_op(body_index(editable_of(t))); caret_to_start(t.rows[0].cells[0]); }
/* { td, tr, table, host } of the cell holding the caret, or null */
