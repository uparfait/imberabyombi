/* editor/format/table_ops.js: the table under the caret (table_ctx), the parts of a table split across pages
   (table_chain), the selected cells, and tbl_op(op, arg): every table command as one undo step. */
import { qsa, el_of, editable_of, bodies, is_table, last_range, caret_to_start, body_index, toast, begin_op, end_op } from '../core/index.js';
import { can_edit } from './commands.js';
import { insert_block_at_caret } from './insert.js';
