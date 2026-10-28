/* actions/act_tables.jsx: data-act handlers of tables and records: row details, pager, sorting, tabs, add / edit / delete,
   "Add …" from the create menu, the table tools (full screen, all columns, export) and the chart cards. */
import { qs, qsa } from '../lib/index.js';
import { ui, cur, route, db, render, rerender } from '../store/index.js';
import { reduced, sleep, notify } from '../feedback/index.js';
import { modal, ask, close_dialog } from '../overlays/index.js';
import { schemas } from '../schemas/index.js';
import { view_row, refresh, open_form, kv_table, table_full, tview, tview_save, col_show, export_dialog } from '../table/index.js';
