/* editor/format/commands.js: the formatting commands: the editing-mode guard, the execCommand wrapper, inline styles on
   the selection (wrap_selection), font size / font / text colour / highlight. All callable inside live.preview(fn)
   (core keeps previews out of history and holds their toasts back). */
import { state, refs, el, qsa, uid, clamp, editable_of, restore_focus, set_caret, body_index, schedule_reflow, toast, begin_op, commit_soon } from '../core/index.js';
import { refresh_toolbar } from '../ui/index.js';
