/* editor/ui/toolbar.js: the toolbar (source "toolbar wiring"): ACTIONS for the [data-ed] buttons (those with an effect on
   the text preview it on hover, a click keeps it), the dropdown buttons (zoom, styles, font, size, colours, image, align,
   spacing, checklist / bullet / number styles, mode), the menus toggle, the top bar's buttons, the size box, the title. */
import { state, refs, qsa, FONTS, undo, redo, restore_focus } from '../core/index.js';
import { start_paint, bump_size, exec, toggle_checklist, toggle_list, indent, clear_formatting, set_font_size, set_font, set_text_color,
  set_hilite } from '../format/index.js';
import { open_link_dialog, add_comment, insert_image_file } from '../content/index.js';
import { open_upload_dialog } from '../io_import/index.js';
import { open_download_dialog } from '../io_export/index.js';
import { menu_stack, toggle_menu } from './menu_engine.js';
import { peek, unpeek_key, pick, field_has_focus } from './hover_preview.js';
import { palette_el } from './palette.js';
import { zoom_items, style_items, align_items, spacing_items, bullet_items, number_items } from './menu_items.jsx';
import { mode_items } from './menus_main.js';
import { image_items } from './menus.js';
import { open_find } from './find.js';
import { toggle_spell, toggle_menus, do_print } from './view.js';
import { listen } from './ui_dom.js';

export const ACTIONS = {
  find: () => open_find(), undo: () => undo(), redo: () => redo(), print: () => do_print(), upload: () => open_upload_dialog(),
  download: () => open_download_dialog(), spell: () => toggle_spell(), paint: () => start_paint(),
  size_down: () => bump_size(-1), size_up: () => bump_size(1), bold: () => exec('bold'), italic: () => exec('italic'), underline: () => exec('underline'),
  link: () => open_link_dialog(), comment: () => add_comment(), checklist: () => toggle_checklist(), bullets: () => toggle_list('UL'),
  numbers: () => toggle_list('OL'), outdent: () => indent(-1), indent: () => indent(1), clear: () => clear_formatting()
};
/* the [data-ed] buttons whose effect shows on hover */
export const LIVE_ED = ['size_down', 'size_up', 'bold', 'italic', 'underline', 'checklist', 'bullets', 'numbers', 'outdent', 'indent', 'clear'];

const font_items = () => FONTS.map(f => ({ label: f, label_style: `font-family:'${f}'`, checked: (refs.font_label ? refs.font_label.textContent : '') === f, action: () => set_font(f) }));
const size_items = () => [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96].map(s => ({ label: String(s), action: () => set_font_size(s) }));
const indent_items = () => [{ label: 'Increase indent', icon: 'format_indent_increase', action: () => indent(1) },
  { label: 'Decrease indent', icon: 'format_indent_decrease', action: () => indent(-1) }];
/* dropdown button id → its items */
