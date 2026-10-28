/* editor/format/table_props.jsx: the "Table properties" dialog: rows, columns, border width and colour, cell padding,
   vertical alignment, width and position, header row, striped rows, equal column widths (one undo step on Apply). */
import { modal } from '../../overlays/index.js';
import { clamp, to_hex, toast } from '../core/index.js';
import { can_edit } from './commands.js';
import { chain_rows, table_width_cols, insert_rows, insert_cols, delete_col } from './table_model.js';
import { table_ctx, table_chain, tbl_op } from './table_ops.js';
