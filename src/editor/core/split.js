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
    const n = cur_sel[key + 'c'], o = cur_sel[key + 'o'];
    if (n && block.contains(n)) { const off = offset_within(block, n, o); if (off >= k) remap.push([key, off - k]); }
  }
  const p = position_at(block, k);
  const r = document.createRange(); r.setStart(p.node, p.offset); r.setEnd(block, block.childNodes.length);
  const frag = r.extractContents();
  const nb = block.cloneNode(false); nb.setAttribute('data-cont', '1'); nb.removeAttribute('id'); nb.appendChild(frag);
  insert_at_start(next, [nb]);
  remap.forEach(([key, off]) => { const q = position_at(nb, off); cur_sel[key + 'c'] = q.node; cur_sel[key + 'o'] = q.offset; });
  return true;
}
/* the page break that has flow content after it (absolute images after a break stay on their page) */
export function break_with_rest(b) {
  return flow_kids(b).find(c => { if (!is_break(c)) return false; for (let n = c.nextSibling; n; n = n.nextSibling) if (!is_abs(n)) return true; return false; }) || null;
}
export function push_overflow(b, next) {
  const pb = break_with_rest(b);
  if (pb) { const rest = []; let n = pb.nextSibling; while (n) { if (!is_abs(n)) rest.push(n); n = n.nextSibling; } insert_at_start(next, rest); }
  if (!overflows(b)) return;
  const kids = flow_kids(b), lim = b.clientHeight + 1;
  let idx = kids.findIndex(c => c.offsetTop + c.offsetHeight - pad_bottom(c) > lim);
  if (idx < 0) idx = kids.length - 1;
  if (idx < kids.length - 1) insert_at_start(next, kids.slice(idx + 1));
  let g = 0;
  while (overflows(b) && g++ < 500) {
    const last = last_flow(b);
    if ((is_list(last) || is_table(last)) && items_of(last).length > 1) { split_container(last, b, next); continue; }
    if (is_splittable_text(last) && split_text(last, b, next)) continue;
