/* editor/ui/shortcuts.js: the editor's keyboard (source "global shortcuts"), on the document's capture phase while the
   editor is on screen: the open menus first (menu_keys.js), Esc closes the editor's own overlays, then the Ctrl / ⌘
   shortcuts (editing ones only inside the document). A handled key stops there, so the template's own shortcuts (Ctrl+K:
   its command palette) do not also run. Keys inside a template dialog are left to it. */
import { pages_el, editable_of, undo, redo } from '../core/index.js';
import { hide_link_bubble, open_link_dialog, add_comment, set_paste_plain } from '../content/index.js';
import { paint, stop_paint, clear_formatting, set_block_style, toggle_list, toggle_checklist, exec, bump_size, indent } from '../format/index.js';
