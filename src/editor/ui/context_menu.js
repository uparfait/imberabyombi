/* editor/ui/context_menu.js: the right-click menu on the pages (source "context menu"): on a picture, every image option;
   in the text: cut / copy / paste, comment, link, insert table (and the table's own items inside a table), clear
   formatting. A right-click outside the selection first moves the caret to the clicked point. */
import { state, editable_of, caret_from_point, set_caret, set_last } from '../core/index.js';
import { select_image, image_menu_items, open_link_dialog, add_comment, paste_from_clipboard } from '../content/index.js';
import { table_ctx, table_menu_items, table_grid_el, clear_formatting } from '../format/index.js';
import { open_menu } from './menu_engine.js';
import { cmd, native } from './menus_main.js';

export function on_context_menu(e) {
  const at = { x: e.clientX, y: e.clientY }, img = e.target.closest && e.target.closest('.pg_body img');
  if (img) {
    if (state.mode !== 'edit') return;
