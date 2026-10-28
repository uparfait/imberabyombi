/* ui/cells.jsx: table cell renderers (progress, stock meter, the default cell of a schema column),
   column labels, the searchable text of a value and the <option> list of a schema field. */
import { cap, fmt_d, fmt_dt, money } from '../lib/index.js';
import { role_name } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
