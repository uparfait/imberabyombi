/* editor/format/table_menu.js: the table menu (Format › Table and the right-click menu inside a table) as plain item
   data for the ui part's menu engine: { label, icon, action } / { sep } / { sub } / { render } / { checked }. */
import { palette_el } from '../ui/index.js';
import { TABLE_PRESETS } from './table_model.js';
import { table_ctx, table_chain, tbl_op } from './table_ops.js';
