/* editor/ui/shortcuts.js: the editor's keyboard (source "global shortcuts"), on the document's capture phase while the
   editor is on screen: the open menus first (menu_keys.js), Esc closes the editor's own overlays, then the Ctrl / ⌘
   shortcuts (editing ones only inside the document). A handled key stops there, so the template's own shortcuts (Ctrl+K:
   its command palette) do not also run. Keys inside a template dialog are left to it. */
import { pages_el, editable_of, undo, redo } from '../core/index.js';
