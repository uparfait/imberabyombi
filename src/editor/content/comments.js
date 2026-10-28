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
