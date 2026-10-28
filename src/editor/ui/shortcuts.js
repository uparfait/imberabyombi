/* editor/ui/shortcuts.js: the editor's keyboard (source "global shortcuts"), on the document's capture phase while the
   editor is on screen: the open menus first (menu_keys.js), Esc closes the editor's own overlays, then the Ctrl / ⌘
   shortcuts (editing ones only inside the document). A handled key stops there, so the template's own shortcuts (Ctrl+K:
   its command palette) do not also run. Keys inside a template dialog are left to it. */
import { pages_el, editable_of, undo, redo } from '../core/index.js';
import { hide_link_bubble, open_link_dialog, add_comment, set_paste_plain } from '../content/index.js';
import { paint, stop_paint, clear_formatting, set_block_style, toggle_list, toggle_checklist, exec, bump_size, indent } from '../format/index.js';
import { open_upload_dialog } from '../io_import/index.js';
import { save_project } from '../io_export/index.js';
import { menu_key } from './menu_keys.js';
import { find_state, open_find, close_find } from './find.js';
import { word_count_dialog, shortcuts_dialog } from './info_dialogs.jsx';
import { toggle_menus, do_print } from './view.js';
import { step_tab } from './tabs.jsx';

const ALIGN = { KeyL: 'justifyLeft', KeyE: 'justifyCenter', KeyR: 'justifyRight', KeyJ: 'justifyFull' };

/* shortcuts that work anywhere on the editor page */
function global_key(e, k) {
  if (k === 'pagedown' || k === 'pageup') return () => step_tab(k === 'pagedown' ? 1 : -1);
  if (k === 'p' && !e.shiftKey) return do_print;
  if ((k === 'f' && !e.shiftKey) || k === 'h') return open_find;
  if (k === 'f' && e.shiftKey) return toggle_menus;
  if (k === 'o') return () => open_upload_dialog();
