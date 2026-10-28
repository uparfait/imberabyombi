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
