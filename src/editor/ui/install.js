/* editor/ui/install.js: install_ui(): the source's top-level listeners of the ui area (menus, menu bar, find panel,
   selection, side panels, rulers, scroll / resize, context menu, toolbar, keyboard), added when the editor starts and
   removed by the returned cleanup (the keyboard only acts while the editor is on screen). */
import { state, refs, pages_el, scroller, hruler, vruler, qsa, current_page } from '../core/index.js';
import { hide_link_bubble, add_blank_page, render_comments } from '../content/index.js';
