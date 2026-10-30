/* behaviors/change_events.js: the change listener. Chart date range, fixed errors, task view edits (modules), the export
   dialog, table settings (rows per page, columns), switches, theme, calendar view, multi-selects and file fields. */
import { qsa } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ui, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { request, clear_err, staff_page } from '../feedback/index.js';
import { ms_sync } from '../overlays/index.js';
import { file_tiles } from '../files/index.js';
import { viz_range } from '../charts/index.js';
import { task_change } from '../modules/index.js';
import * as table from '../table/index.js';
import { set_token, set_theme } from '../actions/index.js';
import { allow_select_change, page_tz_change, role_land_change, perm_change, import_change } from './settings_changes.js';

function on_change(e) {
  const t = e.target;
  if (t.matches?.('[data-viz-range]')) return request(() => viz_range(t.value));   /* a get: new numbers for the range */
  if (t.getAttribute?.('aria-invalid') === 'true' && t.checkValidity()) { clear_err(t); if (t.type === 'radio') qsa(`[name="${t.name}"]`, t.form || document).forEach(clear_err); }
  /* task view: a subtask ticked, the status picked, files added (modules own that state) */
  if (task_change(t)) return;
  if (t.name === 'status' && t.form?.querySelector('[data-when]')) table.sync_when(t.form);
  /* export: an unticked column cannot be renamed; with no column ticked the download is off (the export dialog's state) */
  if (t.closest?.('[data-export-cols]') && t.type === 'checkbox') { table.export_change?.(t); return; }
  if (t.dataset.tablePer) { const c = t.dataset.tablePer; table.tview(c).per = +t.value; table.tview_save(c); ui.page[c] = 1;
