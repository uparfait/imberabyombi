/* editor/format/guards.js: helpers around core's live preview and the template modal. Core already keeps previews out
   of the undo stack and holds their toasts back (shown if the preview is kept), so the format commands call begin_op /
   end_op / toast as the source does; only the dialogs check previewing() (a hover never opens a dialog). */
import { live, pages_el, restore_focus, qs } from '../core/index.js';

export const previewing = () => !!(live && live.active);

/* fn runs once, when #modal has closed (its close event; at once when there is no #modal) */
