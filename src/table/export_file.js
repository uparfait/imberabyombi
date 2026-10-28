/* table/export_file.js: Export (every table): CSV, JSON or Excel (XML spreadsheet). The rows follow the table's filters
   (the dialog's filters replace the table's own for those columns) and the date range, on the table's first date column. */
import { cap, ymd, dl } from '../lib/index.js';
import { ui } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { role_name } from '../auth/index.js';
import { notify } from '../feedback/index.js';
import { rows_of } from './rows.js';
