/* editor/content/paste.js: paste and drop. Pasted HTML is sanitized (Ctrl+Shift+V or paste_plain: text only), pasted
   or dropped pictures go in at the caret / drop point, other dropped files open the upload dialog (insert mode).
   Edit › Paste reads the clipboard itself (paste_from_clipboard). */
import { toast, state, editable_of, body_index, restore_focus, caret_from_point, set_caret, read_as_data_url, begin_op, end_op } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { open_upload_dialog } from '../io_import/index.js';
import { sanitize_html } from './sanitize.js';
import { insert_image, insert_image_file } from './img_io.js';
