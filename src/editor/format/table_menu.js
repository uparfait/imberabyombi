/* editor/format/table_menu.js: the table menu (Format › Table and the right-click menu inside a table) as plain item
   data for the ui part's menu engine: { label, icon, action } / { sep } / { sub } / { render } / { checked }. */
import { palette_el } from '../ui/index.js';
import { TABLE_PRESETS } from './table_model.js';
import { table_ctx, table_chain, tbl_op } from './table_ops.js';
import { insert_multiple_dialog } from './table_dialogs.jsx';
import { table_props_dialog } from './table_props.jsx';

const VALIGN_ITEMS = [['Top', 'top', 'vertical_align_top'], ['Middle', 'middle', 'vertical_align_center'], ['Bottom', 'bottom', 'vertical_align_bottom']];
