/* table/crud.jsx: 8. GENERIC CRUD: table + search + sort + export + add/edit/delete, from a schema.
   crud(c, o) draws a table card. o: { title, mod, filter(row), preset, acts(row, can) → JSX, can_row(row), view(id) }. */
import { cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, route, after_render } from '../store/index.js';
import { label } from '../ui/index.js';
import { tview, sync_tools } from './table_view.js';
import { col_filter } from './col_filter.jsx';
import { table_menu, full_btn } from './table_parts.jsx';
import { table_body } from './table_body.jsx';
import { EXPORTS } from './export_file.js';
import { ph_height } from './table_full.js';

/* Export ▾: CSV, JSON, Excel */
const export_menu = c => (
  <div className="relative">
    <button className="btn btn_outline btn_sm" data-act="pop" data-pop={`pop_export_${c}`} aria-haspopup="menu">{ic('download', 'w-4 h-4')}Export{ic('chev_d', 'h-4 w-4')}</button>
    <div id={`pop_export_${c}`} className="pop right-0 w-56" role="menu" hidden>{EXPORTS.map(([f, l, i]) => (
