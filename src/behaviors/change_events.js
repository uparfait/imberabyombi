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
  if (t.name && t.form?.querySelector('[data-when]')) table.sync_when(t.form);   /* fields shown for some values only */
  /* export: an unticked column cannot be renamed; with no column ticked the download is off (the export dialog's state) */
  if (t.closest?.('[data-export-cols]') && t.type === 'checkbox') { table.export_change?.(t); return; }
  if (t.dataset.tablePer) { const c = t.dataset.tablePer; table.tview(c).per = +t.value; table.tview_save(c); ui.page[c] = 1;
    return request(() => table.refresh(c), { delay: staff_page() ? cfg.latency : 0 }); }
  if (t.dataset.tableCol) { const c = t.dataset.tableCol, v = table.tview(c), k = t.value;
    if (!t.checked && schemas[c].cols.length - v.hide.length <= 1) { t.checked = true; return; }   /* one column always stays */
    v.hide = t.checked ? v.hide.filter(x => x !== k) : [...v.hide, k]; table.tview_save(c); return table.col_show(c, k, t.checked); }
  if (t.matches?.('[data-allow-select]')) return allow_select_change(t);
  if (t.dataset.pageTz != null) return page_tz_change(t);
  if (t.dataset.roleLand) role_land_change(t);
  if (t.dataset.perm) perm_change(t);
  if (t.dataset.token && t.type === 'select-one') set_token(t.dataset.token, t.value);
  if (t.dataset.themeSet != null) set_theme(t.value);
  if (t.dataset.calview != null) { ui.cal_view = t.value; ui.slide = { n: 0, sel: '.date_body' }; rerender(); }
  if (t.multiple && t.tagName === 'SELECT') ms_sync(t);
  if (t.type === 'file' && t.dataset.import == null) file_tiles(t);
  if (t.dataset.import != null && t.files[0]) import_change(t);
}

export const install_change = () => document.addEventListener('change', on_change);
