/* editor/format/table_menu.js: the table menu (Format › Table and the right-click menu inside a table) as plain item
   data for the ui part's menu engine: { label, icon, action } / { sep } / { sub } / { render } / { checked }. */
import { palette_el } from '../ui/index.js';
import { TABLE_PRESETS } from './table_model.js';
import { table_ctx, table_chain, tbl_op } from './table_ops.js';
import { insert_multiple_dialog } from './table_dialogs.jsx';
import { table_props_dialog } from './table_props.jsx';

const VALIGN_ITEMS = [['Top', 'top', 'vertical_align_top'], ['Middle', 'middle', 'vertical_align_center'], ['Bottom', 'bottom', 'vertical_align_bottom']];

export function table_menu_items() {
  const c = table_ctx(), t0 = c && table_chain(c.table)[0];
  return [
    { label: 'Insert row above', icon: 'add_row_above', action: () => tbl_op('row_above') },
    { label: 'Insert row below', icon: 'add_row_below', action: () => tbl_op('row_below') },
    { label: 'Insert column left', icon: 'add_column_left', action: () => tbl_op('col_left') },
    { label: 'Insert column right', icon: 'add_column_right', action: () => tbl_op('col_right') },
    { label: 'Insert several rows or columns…', icon: 'library_add', action: insert_multiple_dialog },
    { sep: true },
    { label: 'Delete row', icon: 'delete', action: () => tbl_op('del_row') },
    { label: 'Delete column', icon: 'delete', action: () => tbl_op('del_col') },
    { label: 'Delete table', icon: 'delete_forever', action: () => tbl_op('del_table') },
    { sep: true },
    { label: 'Merge with the cell on the right', icon: 'call_merge', action: () => tbl_op('merge') },
    { label: 'Unmerge cell', icon: 'call_split', action: () => tbl_op('split') },
    { label: 'Make columns equal width', icon: 'view_column', action: () => tbl_op('distribute') },
    { sep: true },
    { label: 'Table style', icon: 'style', sub: () => TABLE_PRESETS.map(p => ({ label: p.label, action: () => tbl_op('preset', p.key) })) },
    { label: 'Cell background', icon: 'format_color_fill', sub: () => [{ render: () => palette_el(col => tbl_op('cell_bg', col), 'None') }] },
    { label: 'Vertical alignment', icon: 'vertical_align_center', sub: () => VALIGN_ITEMS.map(([l, v, i]) => ({ label: l, icon: i, action: () => tbl_op('valign', v) })) },
    { label: 'Border width', icon: 'border_style', sub: () => [0, 1, 2, 3].map(w => ({ label: w ? w + ' px' : 'No border', action: () => tbl_op('border', w) })) },
    { label: 'Border color', icon: 'border_color', sub: () => [{ render: () => palette_el(col => tbl_op('border_color', col), 'Black') }] },
    { label: 'Header row', icon: 'table_rows', checked: !!(t0 && t0.hasAttribute('data-header')), action: () => tbl_op('header') },
    { label: 'Striped rows', icon: 'reorder', checked: !!(t0 && t0.hasAttribute('data-striped')), action: () => tbl_op('striped') },
    { sep: true },
