/* actions/act_tables.jsx: data-act handlers of tables and records: row details, pager, sorting, tabs, add / edit / delete,
   "Add …" from the create menu, the table tools (full screen, all columns, export) and the chart cards. */
import { qs, qsa } from '../lib/index.js';
import { ui, cur, route, db, render, rerender } from '../store/index.js';
import { reduced, sleep, notify } from '../feedback/index.js';
import { modal, ask, close_dialog } from '../overlays/index.js';
import { schemas } from '../schemas/index.js';
import { view_row, refresh, open_form, kv_table, table_full, tview, tview_save, col_show, export_dialog } from '../table/index.js';
import { viz } from '../charts/index.js';
import { close_pops } from './pops.js';

/* A cell shown again in the row's details: copies of the cell's nodes go into a wrapper React renders empty on purpose
   (display: contents, so the value cell lays out like the reference, where the cell's HTML went straight in) */
const dom_copy = from => <span style={{ display: 'contents' }} ref={el => { if (el && !el.firstChild) el.append(...from.cloneNode(true).childNodes); }} />;

export const TABLE_ACT = {
