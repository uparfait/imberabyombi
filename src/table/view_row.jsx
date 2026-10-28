/* table/view_row.jsx: Full details of one record (row click): every schema field (grouped by the schema's sec categories),
   values unclipped; Edit + Delete for managers */
import { cap } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db, cur } from '../store/index.js';
import { auth } from '../auth/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { label, cell } from '../ui/index.js';
