/* table/export_dialog.jsx: Export (every table): CSV, JSON or Excel. The dialog picks a date range (on the table's first date
   column), the columns to include and what each column is called in the file. Rows follow the table's current filters. */
import { schemas, field_spec } from '../schemas/index.js';
import { ui } from '../store/index.js';
import { label, options } from '../ui/index.js';
import { field } from '../fields/index.js';
import { form_msg, show_err } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
