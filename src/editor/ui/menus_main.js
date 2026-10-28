/* editor/ui/menus_main.js: the File, Edit and View menus of the menu bar (source MENUS.file / edit / view). Commands and
   view switches carry no_preview (only formatting choices preview on hover). View › Theme uses the template's theme. */
import { state, refs, undo, redo, restore_focus, begin_op, commit, save_soon, toast } from '../core/index.js';
import { paste_from_clipboard, render_comments } from '../content/index.js';
import { open_upload_dialog, pick_file } from '../io_import/index.js';
import { open_download_dialog } from '../io_export/index.js';
