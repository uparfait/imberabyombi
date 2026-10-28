/* editor/core/split.js: pagination engine, part 2: split a paragraph at the last character that fits (keeping the
   caret on the right side), push overflow to the next page, pull blocks back up, and page signatures for early exit. */
import { TEXT_BLOCK_RE } from './constants.js';
import { is_break, is_list, is_table, is_abs, text_nodes, offset_within, position_at, same_kind, pad_bottom, first_flow, last_flow, flow_kids } from './dom.js';
import { cur_sel, overflows, items_of, insert_at_start, merge_into, split_container, content_bottom } from './flow.js';

export function is_splittable_text(e) {
  return TEXT_BLOCK_RE.test(e.tagName) && !/^H[1-6]$/.test(e.tagName) && !is_break(e) && e.textContent.replace(/\u200b/g, '').length > 1;
}
export function split_text(block, b, next) {
  const tn = text_nodes(block); if (!tn.length) return false;
  const cum = []; let total = 0; tn.forEach(t => { cum.push(total); total += t.length; });
  if (total < 2) return false;
  const limit = b.getBoundingClientRect().bottom - 1;
  const rng = document.createRange();
  const char_bottom = i => {
    let lo = 0, hi = tn.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (cum[mid] <= i) lo = mid; else hi = mid - 1; }
    const t = tn[lo], o = i - cum[lo]; if (o >= t.length) return -Infinity;
    rng.setStart(t, o); rng.setEnd(t, o + 1); const rs = rng.getClientRects();
    return rs.length ? rs[rs.length - 1].bottom : -Infinity;
  };
  let lo = 0, hi = total - 1, best = -1;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (char_bottom(mid) <= limit) { best = mid; lo = mid + 1; } else hi = mid - 1; }
  if (best < 0) return false;
  let k = best + 1; if (k >= total) return false;
  const text = tn.map(t => t.data).join('');
  if (!/\s/.test(text[k - 1]) && !/\s/.test(text[k])) {
    const sp = Math.max(text.lastIndexOf(' ', k - 1), text.lastIndexOf('\t', k - 1), text.lastIndexOf('\n', k - 1)); if (sp > 0) k = sp + 1;
  }
  const remap = [];
  if (cur_sel) for (const key of ['s', 'e']) {
