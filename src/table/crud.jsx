/* table/crud.jsx: 8. GENERIC CRUD: table + search + sort + export + add/edit/delete, from a schema.
   crud(c, o) draws a table card. o: { title, mod, filter(row), preset, acts(row, can) → JSX, can_row(row), view(id) }. */
import { cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { ui, cur, route, after_render } from '../store/index.js';
import { label } from '../ui/index.js';
