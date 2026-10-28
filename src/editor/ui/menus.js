/* editor/ui/menus.js: the Insert, Format, Tools and Help menus and MENUS, the menu bar's table (source MENUS): each key
   (data-menu="file" …) gives a function that builds the menu's items when it opens. Inserts and commands carry
   no_preview; the Format menu's choices preview on hover. */
import { state, refs, pages_el, current_page, qs, save_soon } from '../core/index.js';
import { indent, clear_formatting, toggle_checklist, insert_hr, insert_page_break, insert_text_at_caret, table_grid_el, table_menu_items } from '../format/index.js';
import { open_link_dialog, add_comment, add_blank_page } from '../content/index.js';
import { pick_any, attach_files } from '../io_import/index.js';
import { cmd, file_items, edit_items, view_items } from './menus_main.js';
import { align_items, spacing_items, bullet_items, number_items, text_items, style_items } from './menu_items.jsx';
import { page_setup_dialog } from './page_setup.jsx';
import { word_count_dialog, shortcuts_dialog } from './info_dialogs.jsx';
import { special_chars_dialog, image_url_dialog } from './insert_dialogs.jsx';
import { open_find } from './find.js';
import { apply_setup, toggle_spell } from './view.js';

/* Insert › Image and the toolbar's image button */
export function image_items() {
  return [cmd('Upload from computer', 'upload', () => { if (refs.image_open) refs.image_open.click(); }), cmd('By URL', 'link', () => image_url_dialog())];
}
/* header / footer / page numbers on or off (the new header or footer gets the caret) */
function page_part(key, sel) {
  state.setup[key] = !state.setup[key]; apply_setup(false); save_soon();
  if (sel && state.setup[key]) setTimeout(() => { const e = pages_el && qs(sel, pages_el); if (e) e.focus(); }, 30);
}
function insert_items() {
  return [
    { label: 'Image', icon: 'image', sub: image_items },
    { label: 'Table', icon: 'table', sub: () => [{ render: table_grid_el }] },
    cmd('File attachment…', 'attach_file', () => pick_any(attach_files)),
    cmd('Link', 'link', () => open_link_dialog(), 'Ctrl+K'),
    cmd('Comment', 'add_comment', () => add_comment(), 'Ctrl+Alt+M'),
    { sep: true }, cmd('Horizontal line', 'horizontal_rule', () => insert_hr()),
    cmd('Page break', 'insert_page_break', () => insert_page_break(), 'Ctrl+Enter'),
    cmd('Blank page after this one', 'note_add', () => add_blank_page(current_page())),
    cmd('Date', 'calendar_today', () => insert_text_at_caret(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }))),
    cmd('Special characters', 'emoji_symbols', () => special_chars_dialog()),
    { sep: true },
    { label: 'Header', icon: 'vertical_align_top', checked: !!state.setup.header, no_preview: true, action: () => page_part('header', '.pg_header') },
