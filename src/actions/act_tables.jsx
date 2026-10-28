/* actions/act_tables.jsx: data-act handlers of tables and records: row details, pager, sorting, tabs, add / edit / delete,
   "Add …" from the create menu, the table tools (full screen, all columns, export) and the chart cards. */
import { qs, qsa } from '../lib/index.js';
import { ui, cur, route, db, render, rerender } from '../store/index.js';
