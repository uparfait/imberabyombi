/* editor/content/comments.js: comments: add one on the selected text (a .cmt span with data-cid), remove / resolve it
   (on any tab), make one active (highlight in the page + its card), and refresh the panel after edits. */
import { qs, qsa, uid, el, toast, state, pages_el, restore_focus, begin_op, end_op, body_index, save_soon } from '../core/index.js';
import { can_edit, wrap_selection, previewing } from '../format/index.js';
import { apply_panels } from '../ui/index.js';
import { render_comments } from './comment_cards.js';

export function add_comment() {
  if (previewing() || !can_edit()) return;
  const host = restore_focus(), s = getSelection();
  if (!s.rangeCount || s.isCollapsed || !host || !host.classList.contains('pg_body')) { toast('Select some text to comment on'); return; }
  const quote = s.toString().replace(/\u200b/g, '').slice(0, 300), id = uid();
  begin_op(); const spans = wrap_selection('cmt', { 'data-cid': id }); if (!spans.length) return;
  end_op(body_index(host));
  state.comments.push({ id, tab: state.active, quote, text: '', time: Date.now(), replies: [], draft: true });
  state.show_comments = true; apply_panels(); render_comments(); activate_comment(id, true);
}
export function strip_comment(html, id) {
  const d = el('div'); d.innerHTML = html; qsa(`.cmt[data-cid="${id}"]`, d).forEach(sp => sp.replaceWith(...sp.childNodes)); return d.innerHTML;
}
export function remove_comment(id) {
  const c = state.comments.find(x => x.id === id); if (!c) return;
  state.comments = state.comments.filter(x => x.id !== id);
  if (c.tab === state.active) {
    const spans = qsa(`.cmt[data-cid="${id}"]`, pages_el);
    if (spans.length) { begin_op(); spans.forEach(sp => sp.replaceWith(...sp.childNodes)); end_op(0, true); }
  }
  else { const t = state.tabs.find(x => x.id === c.tab); if (t) t.html = strip_comment(t.html, id); }
  save_soon(); render_comments();
}
export function activate_comment(id, focus) {
  qsa('.cmt.active', pages_el).forEach(x => x.classList.remove('active'));
  qsa(`.cmt[data-cid="${id}"]`, pages_el).forEach(x => x.classList.add('active'));
  qsa('.c_card').forEach(c => c.classList.toggle('active', c.dataset.id === id));
  const card = qs(`.c_card[data-id="${id}"]`);
