/* editor/format/guards.js: helpers around core's live preview and the template modal. Core already keeps previews out
   of the undo stack and holds their toasts back (shown if the preview is kept), so the format commands call begin_op /
   end_op / toast as the source does; only the dialogs check previewing() (a hover never opens a dialog). */
import { live, pages_el, restore_focus, qs } from '../core/index.js';

export const previewing = () => !!(live && live.active);

/* fn runs once, when #modal has closed (its close event; at once when there is no #modal) */
export function after_close(fn) { const d = qs('#modal'); if (d) d.addEventListener('close', () => fn(), { once: true }); else fn(); }
/* The table dialogs (template modal) apply their result at once, like the source (core's restore_sel only remembers the
   caret while focus is in a dialog field); once #modal has closed, the focus goes back to the caret in the document. */
export function refocus_after_close() { after_close(() => { if (pages_el && pages_el.isConnected) restore_focus(); }); }
