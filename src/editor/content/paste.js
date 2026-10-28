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
  if (body && files.length) { files.forEach(insert_image_file); return; }
  const html = cd.getData('text/html'), text = cd.getData('text/plain');
  begin_op();
  if (!body || paste_plain || !html) document.execCommand('insertText', false, text);
  else { document.execCommand('insertHTML', false, sanitize_html(html)); adopt_abs(host); }
  paste_plain = false;
  if (body) end_op(body_index(host));
}
export async function paste_from_clipboard(plain) {
  if (previewing() || !can_edit()) return;
  restore_focus();
  try {
    if (!plain && navigator.clipboard.read) {
      const items = await navigator.clipboard.read();
      for (const it of items) {
        const img = it.types.find(t => t.startsWith('image/')); if (img) { insert_image(await read_as_data_url(await it.getType(img))); return; }
        if (it.types.includes('text/html')) {
          const h = await (await it.getType('text/html')).text(), host = restore_focus(); begin_op();
          document.execCommand('insertHTML', false, sanitize_html(h)); adopt_abs(host); end_op(); return;
        }
      }
    }
    const t = await navigator.clipboard.readText(); restore_focus(); document.execCommand('insertText', false, t);
  } catch (err) { toast('Your browser blocked clipboard access. Press Ctrl+V to paste.'); }
}
/* files dropped anywhere while the editor is on screen (a dialog's own drop zone handles its drops) */
export function drop_handler(e) {
  const files = Array.from((e.dataTransfer && e.dataTransfer.files) || []); if (!files.length) return;
