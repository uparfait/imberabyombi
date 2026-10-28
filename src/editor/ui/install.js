/* editor/ui/install.js: install_ui(): the source's top-level listeners of the ui area (menus, menu bar, find panel,
   selection, side panels, rulers, scroll / resize, context menu, toolbar, keyboard), added when the editor starts and
   removed by the returned cleanup (the keyboard only acts while the editor is on screen). */
import { state, refs, pages_el, scroller, hruler, vruler, qsa, current_page } from '../core/index.js';
import { hide_link_bubble, add_blank_page, render_comments } from '../content/index.js';
import { menu_stack, open_menu, toggle_menu, close_menus, on_outside_down } from './menu_engine.js';
import { unpeek } from './hover_preview.js';
import { MENUS } from './menus.js';
import { install_find } from './find.js';
import { on_selection, stop_sel_timer } from './toolbar_state.js';
import { install_toolbar } from './toolbar.js';
import { on_context_menu } from './context_menu.js';
import { on_key } from './shortcuts.js';
import { add_tab } from './tabs.jsx';
import { apply_panels } from './pages_panel.js';
import { update_rulers, ruler_drag, draw_h_ruler, draw_v_ruler } from './rulers.js';
import { drop_page_rule, page_rule_el } from './view.js';
import { listen, run_offs } from './ui_dom.js';
