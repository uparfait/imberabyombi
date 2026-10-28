/* editor/content/paste.js: paste and drop. Pasted HTML is sanitized (Ctrl+Shift+V or paste_plain: text only), pasted
   or dropped pictures go in at the caret / drop point, other dropped files open the upload dialog (insert mode).
   Edit › Paste reads the clipboard itself (paste_from_clipboard). */
import { toast, state, editable_of, body_index, restore_focus, caret_from_point, set_caret, read_as_data_url, begin_op, end_op } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { open_upload_dialog } from '../io_import/index.js';
import { sanitize_html } from './sanitize.js';
import { insert_image, insert_image_file } from './img_io.js';
import { adopt_abs } from './img_pos.js';

/* the next paste is text only (set by the ui's Ctrl+Shift+V before the browser pastes) */
export let paste_plain = false;
export function set_paste_plain(v) { paste_plain = !!v; }

export function pages_paste(e) {
  const host = editable_of(e.target); if (!host) return;
  e.preventDefault(); if (state.mode !== 'edit') return;
  const cd = e.clipboardData, files = Array.from(cd.files || []).filter(f => f.type.startsWith('image/')), body = host.classList.contains('pg_body');
