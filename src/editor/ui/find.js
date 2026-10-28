/* editor/ui/find.js: find & replace (source "find & replace"): every match is a Range over the document's text (blocks
   kept apart so a match never spans two paragraphs), painted with CSS highlights (::highlight(find_all) and
   ::highlight(find_cur)) where the browser has them; step through, replace one or all (one undo step each). */
import { refs, scroller, bodies, editable_of, body_index, last_range, set_last, begin_op, end_op, toast } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { set_text, listen, scaled } from './ui_dom.js';

export const find_state = { open: false, matches: [], idx: -1 };
export const has_hl = !!(typeof window !== 'undefined' && window.CSS && CSS.highlights && window.Highlight);
