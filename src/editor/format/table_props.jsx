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
