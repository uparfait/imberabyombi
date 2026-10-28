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
