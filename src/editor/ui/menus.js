/* editor/ui/menus.js: the Insert, Format, Tools and Help menus and MENUS, the menu bar's table (source MENUS): each key
   (data-menu="file" …) gives a function that builds the menu's items when it opens. Inserts and commands carry
   no_preview; the Format menu's choices preview on hover. */
import { state, refs, pages_el, current_page, qs, save_soon } from '../core/index.js';
import { indent, clear_formatting, toggle_checklist, insert_hr, insert_page_break, insert_text_at_caret, table_grid_el, table_menu_items } from '../format/index.js';
