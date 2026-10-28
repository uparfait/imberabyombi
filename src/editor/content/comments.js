/* editor/content/comments.js: comments: add one on the selected text (a .cmt span with data-cid), remove / resolve it
   (on any tab), make one active (highlight in the page + its card), and refresh the panel after edits. */
import { qs, qsa, uid, el, toast, state, pages_el, restore_focus, begin_op, end_op, body_index, save_soon } from '../core/index.js';
import { can_edit, wrap_selection, previewing } from '../format/index.js';
