/* editor/content/boundaries.js: the caret at a page boundary: at the start / end of a page body, on its first / last
   line, and Backspace / Delete across two pages (merging the split paragraph back, removing a page break).
   Absolute images (front / behind text) are not text: the flow helpers (first_flow, last_flow) skip them. */
import { state, TEXT_BLOCK_RE, bodies, el_of, is_break, is_table, is_empty_block, last_non_break, same_kind, pad_bottom, first_flow, last_flow,
  merge_into, save_sel, restore_sel, caret_to_start, caret_to_end, caret_rect, begin_op, end_op } from '../core/index.js';

const no_text = rr => rr.toString().replace(/\u200b/g, '') === '' && !rr.cloneContents().querySelector('img');
export function at_body_start(host, r) {
  const f = first_flow(host); if (!f) return true;
  if (r.startContainer !== host && !f.contains(r.startContainer)) return false;
  const rr = document.createRange(); rr.setStart(f, 0); try { rr.setEnd(r.startContainer, r.startOffset); } catch (e) { return false; }
  return no_text(rr);
}
export function at_body_end(host, r) {
  const l = last_non_break(host); if (l === host) return true;
  if (!l.contains(r.endContainer)) return false;
  const rr = document.createRange(); try { rr.setStart(r.endContainer, r.endOffset); } catch (e) { return false; } rr.setEnd(l, l.childNodes.length);
  return no_text(rr);
}
export function line_h(r) { const e = el_of(r.startContainer); return parseFloat(getComputedStyle(e).fontSize) * 1.2 * state.zoom; }
export function on_first_line(host, r) {
  const f = first_flow(host); if (!f || is_table(f)) return false;
  if (r.startContainer !== host && !f.contains(r.startContainer)) return false;
  const cr = caret_rect(r), fr = f.getBoundingClientRect(), pt = (parseFloat(getComputedStyle(f).paddingTop) || 0) * state.zoom;
  return cr.top - (fr.top + pt) < line_h(r) * 0.8;
}
export function on_last_line(host, r) {
  const l = last_non_break(host); if (l === host || is_table(l)) return false;
  if (!l.contains(r.startContainer)) return false;
  const cr = caret_rect(r), lr = l.getBoundingClientRect();
  return (lr.bottom - pad_bottom(l) * state.zoom) - cr.bottom < line_h(r) * 0.8;
}
export function backspace_across(host, pi) {
  const prev = bodies()[pi - 1], first = first_flow(host), last = last_flow(prev);
  begin_op();
  if (is_break(last)) { last.remove(); end_op(pi - 1); return; }
  if (!last) { end_op(pi); return; }
  if (is_empty_block(first)) { first.remove(); caret_to_end(last); }
  else if (TEXT_BLOCK_RE.test(last.tagName) && TEXT_BLOCK_RE.test(first.tagName)) {
    const cont = first.hasAttribute('data-cont') && same_kind(last, first);
    if (is_empty_block(last)) { last.remove(); caret_to_start(first); }
    else { caret_to_end(last); merge_into(last, first); if (cont) document.execCommand('delete'); }
  } else caret_to_end(last);
  end_op(pi - 1);
}
export function delete_across(host, pi) {
  const next_b = bodies()[pi + 1], last = last_flow(host), nf = first_flow(next_b);
  begin_op();
  if (is_break(last)) { last.remove(); end_op(pi); return; }
  if (nf && last && TEXT_BLOCK_RE.test(last.tagName) && TEXT_BLOCK_RE.test(nf.tagName)) {
    const cont = nf.hasAttribute('data-cont') && same_kind(last, nf), s = save_sel();
    if (is_empty_block(nf)) nf.remove();
