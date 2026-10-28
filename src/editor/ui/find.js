/* editor/ui/find.js: find & replace (source "find & replace"): every match is a Range over the document's text (blocks
   kept apart so a match never spans two paragraphs), painted with CSS highlights (::highlight(find_all) and
   ::highlight(find_cur)) where the browser has them; step through, replace one or all (one undo step each). */
import { refs, scroller, bodies, editable_of, body_index, last_range, set_last, begin_op, end_op, toast } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { set_text, listen, scaled } from './ui_dom.js';

export const find_state = { open: false, matches: [], idx: -1 };
export const has_hl = !!(typeof window !== 'undefined' && window.CSS && CSS.highlights && window.Highlight);
const BLOCK = 'p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote,pre';

export function open_find() {
  const p = refs.find_panel, i = refs.find_input; if (!p || !i) return;
  p.classList.add('show'); find_state.open = true;
  const sel = last_range && !last_range.collapsed ? last_range.toString() : '';
  if (sel && sel.length < 80) i.value = sel;
  i.focus(); i.select(); run_find();
}
export function close_find() {
