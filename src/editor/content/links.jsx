/* editor/content/links.jsx: links: insert / edit (open_link_dialog: Text + Link), remove, and the address clean-up
   (normalize_url: "lorem.io" → https://lorem.io, "a@b.io" → mailto:). */
import { qs, esc_html, last_range, el_of, editable_of, restore_focus, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { modal } from '../../overlays/index.js';
import { show_err } from '../../feedback/index.js';
import { hide_link_bubble } from './link_bubble.js';

export function normalize_url(u) {
  u = u.trim(); if (!u) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('#')) return u;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)) return 'mailto:' + u;
  return 'https://' + u;
}
export function link_at_caret() { const n = last_range && el_of(last_range.startContainer); return n ? n.closest('.pg_body a') : null; }

export function open_link_dialog(existing) {
  if (previewing() || !can_edit()) return;
  const a = existing || link_at_caret();
  const sel_text = a ? a.textContent : (last_range ? last_range.toString() : '');
  const range = last_range && last_range.cloneRange();
  modal({ title: a ? 'Edit link' : 'Insert link', submit: 'Apply', body: <>
    <div className="field sm:col-span-2"><label htmlFor="lk_text">Text</label><input type="text" id="lk_text" name="text" defaultValue={sel_text} placeholder=" " /></div>
    <div className="field sm:col-span-2"><label htmlFor="lk_url">Link</label>
      <input type="text" inputMode="url" id="lk_url" name="url" defaultValue={a ? a.getAttribute('href') : ''} placeholder="Paste a link or type an address"
        autoComplete="off" /></div>
  </>, on_submit: () => {
    const url = normalize_url(qs('#lk_url').value), text = qs('#lk_text').value;
    if (!url) { show_err(qs('#lk_url'), 'Enter a link address'); qs('#lk_url').focus(); return false; }
    /* the page is inert while the dialog is open: close it at once, put the selection back, then edit */
    qs('#modal')?.close();
    if (range && range.startContainer.isConnected) { const s = getSelection(); s.removeAllRanges(); s.addRange(range); }
    const host = restore_focus(); begin_op();
    if (a) { a.setAttribute('href', url); if (text && text !== a.textContent) a.textContent = text; }
    else if (range && !range.collapsed && (!text || text === sel_text)) document.execCommand('createLink', false, url);
    else document.execCommand('insertHTML', false, `<a href="${esc_html(url)}">${esc_html(text || url)}</a>`);
    end_op(body_index(host));
