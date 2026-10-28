/* editor/ui/sidebar.js: the tab list (source renderSidebar): a filter box once there are more than 5 tabs, the rows (click
   switches, double-click or F2 renames, ⋮ opens the tab menu, drag reorders with a drop line), the outline under the
   active tab. With many tabs the list scrolls inside itself (.tab_scroll.many) and keeps the active tab in view. */
import { state, refs, el, qsa, move_tab } from '../core/index.js';
import { toggle_menu } from './menu_engine.js';
import { switch_tab, tab_menu, start_rename } from './tabs.jsx';
