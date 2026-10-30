/* behaviors/change_events.js: the change listener. Chart date range, fixed errors, task view edits (modules), the export
   dialog, table settings (rows per page, columns), switches, theme, calendar view, multi-selects and file fields. */
import { qsa } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ui, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { request, clear_err, staff_page } from '../feedback/index.js';
