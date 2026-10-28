/* table/table_view.js: Table tools state. Settings (left): rows per page (10, 20, 50) and which columns show,
   remembered per table in this browser. sync_tools() puts the column searches and settings back on screen after a draw. */
import { qsa } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { db, ui } from '../store/index.js';

export const tview = c => (ui.tview[c] ||= { per: cfg.page_size, hide: [], ...(db.get('tview', {})[c] || {}) });
export const tview_save = c => db.set('tview', { ...db.get('tview', {}), [c]: ui.tview[c] });

/* React keeps the column search inputs and the settings ticks across redraws (the reference drew them again), so after a
   draw their values follow ui again: a cleared filter (Clear filters, a hidden column) empties its box. */
export function sync_tools(c) {
  const q = ui.q[c] || {}, v = tview(c);
  qsa(`[data-search="${c}"]`).forEach(el => { const want = q[el.dataset.k] || ''; if (el.value !== want) el.value = want; });
  qsa(`[data-table-per="${c}"]`).forEach(el => { el.checked = +el.value === v.per; });
  qsa(`[data-table-col="${c}"]`).forEach(el => { el.checked = !v.hide.includes(el.value); });
}
