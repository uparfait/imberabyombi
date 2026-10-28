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
  if (refs.find_panel) refs.find_panel.classList.remove('show');
  find_state.open = false; find_state.matches = [];
  if (has_hl) { CSS.highlights.delete('find_all'); CSS.highlights.delete('find_cur'); }
}
/* keep: stay on the same match number (after a replace or an edit) instead of the first one */
export function run_find(keep) {
  const q = refs.find_input ? refs.find_input.value : '', mc = !!(refs.find_case && refs.find_case.checked), prev = find_state.idx;
  find_state.matches = []; find_state.idx = -1;
  if (q) {
    let text = ''; const segs = [];
    bodies().forEach(b => {
      const w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT); let last_blk = null;
      while (w.nextNode()) {
        const t = w.currentNode, blk = t.parentElement.closest(BLOCK) || b;
        if (last_blk && blk !== last_blk) text += '\u0000';
        last_blk = blk; segs.push({ node: t, start: text.length }); text += t.data;
      }
      text += '\u0000';
    });
    const hay = mc ? text : text.toLowerCase(), needle = mc ? q : q.toLowerCase();
    const loc = (pos, end) => {
      let lo = 0, hi = segs.length - 1;
      while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (end ? segs[mid].start < pos : segs[mid].start <= pos) lo = mid; else hi = mid - 1; }
      return { node: segs[lo].node, off: pos - segs[lo].start };
