/* editor/ui/sidebar.js: the tab list (source renderSidebar): a filter box once there are more than 5 tabs, the rows (click
   switches, double-click or F2 renames, ⋮ opens the tab menu, drag reorders with a drop line), the outline under the
   active tab. With many tabs the list scrolls inside itself (.tab_scroll.many) and keeps the active tab in view. */
import { state, refs, el, qsa, move_tab } from '../core/index.js';
import { toggle_menu } from './menu_engine.js';
import { switch_tab, tab_menu, start_rename } from './tabs.jsx';
import { render_outline } from './outline.js';
import { render_pages_panel } from './pages_panel.js';
import { row_drag } from './row_drag.js';
import { mi } from './ui_dom.js';

let tab_q = '';   // the filter text (kept while the list redraws)
const MANY = 5;
const idx = r => state.tabs.findIndex(t => t.id === r.dataset.id);
