/* table/table_view.js: Table tools state. Settings (left): rows per page (10, 20, 50) and which columns show,
   remembered per table in this browser. sync_tools() puts the column searches and settings back on screen after a draw. */
import { qsa } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { db, ui } from '../store/index.js';

export const tview = c => (ui.tview[c] ||= { per: cfg.page_size, hide: [], ...(db.get('tview', {})[c] || {}) });
export const tview_save = c => db.set('tview', { ...db.get('tview', {}), [c]: ui.tview[c] });
