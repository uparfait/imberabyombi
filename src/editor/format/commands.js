/* editor/format/commands.js: the formatting commands: the editing-mode guard, the execCommand wrapper, inline styles on
   the selection (wrap_selection), font size / font / text colour / highlight. All callable inside live.preview(fn)
   (core keeps previews out of history and holds their toasts back). */
import { state, refs, el, qsa, uid, clamp, editable_of, restore_focus, set_caret, body_index, schedule_reflow, toast, begin_op, commit_soon } from '../core/index.js';
import { refresh_toolbar } from '../ui/index.js';

/* ================= formatting commands ================= */
export function can_edit() { if (state.mode !== 'edit') { toast('Switch to Editing mode to make changes'); return false; } return true; }
export function exec(cmd, val) {
  if (!can_edit()) return;
  const host = restore_focus(); begin_op();
  document.execCommand('styleWithCSS', false, true);
  document.execCommand(cmd, false, val);
  if (host && host.classList.contains('pg_body')) schedule_reflow(body_index(host));
  commit_soon(); refresh_toolbar();
}
/* wrap the selected text in spans (class cls, attributes attrs) and select them; returns the spans */
/* the font each selected piece of text has now (the marker in wrap_selection would erase it) */
