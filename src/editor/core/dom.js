/* editor/core/dom.js: DOM helpers (source "DOM helpers"): node tests, the page bodies, editable host of a node,
   text nodes and character offsets inside a block, top-level blocks, and element offsets inside an ancestor.
   Absolute images (data-pos front / behind, direct children of .pg_body) are not part of the text flow: the flow
   helpers (first_flow, last_flow, prev_flow, flow_kids) skip them, and the pagination engine never moves them. */
import { qsa } from './utils.js';
import { pages_el } from './refs.js';

export function is_break(n) { return !!(n && n.nodeType === 1 && n.classList.contains('page_break')); }
export function is_list(n) { return !!(n && (n.tagName === 'UL' || n.tagName === 'OL')); }
export function is_table(n) { return !!(n && n.tagName === 'TABLE'); }
export function is_abs(n) { return !!(n && n.nodeType === 1 && /^(front|behind)$/.test(n.getAttribute('data-pos') || '')); }
export function flow_kids(b) { return Array.from(b.children).filter(c => !is_abs(c)); }
export function first_flow(b) { let e = b && b.firstElementChild; while (e && is_abs(e)) e = e.nextElementSibling; return e || null; }
export function last_flow(b) { let e = b && b.lastElementChild; while (e && is_abs(e)) e = e.previousElementSibling; return e || null; }
export function prev_flow(e) { e = e && e.previousElementSibling; while (e && is_abs(e)) e = e.previousElementSibling; return e || null; }
export function bodies() { return pages_el ? qsa('.pg_body', pages_el) : []; }
export function page_wraps() { return pages_el ? qsa('.page_wrap', pages_el) : []; }
export function body_index(b) { return bodies().indexOf(b); }
export function editable_of(n) {
  if (!n) return null; if (n.nodeType !== 1) n = n.parentElement;
  return n ? n.closest('.pg_body,.pg_header,.pg_footer_text') : null;
}
export function el_of(n) { return n && n.nodeType === 1 ? n : (n ? n.parentElement : null); }
export function node_len(n) { return n.nodeType === 3 ? n.length : n.childNodes.length; }
export function text_nodes(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const a = [];
  while (w.nextNode()) a.push(w.currentNode);
  return a;
}
export function offset_within(block, node, off) {
  const r = document.createRange(); r.setStart(block, 0);
  try { r.setEnd(node, off); } catch { return 0; }
  return r.toString().length;
}
export function position_at(root, k) {
  const ts = text_nodes(root); let acc = 0;
  for (const t of ts) { if (k <= acc + t.length) return { node: t, offset: Math.max(0, k - acc) }; acc += t.length; }
  if (ts.length) { const t = ts[ts.length - 1]; return { node: t, offset: t.length }; }
  return { node: root, offset: 0 };
}
export function top_block(host, n) { if (!n || n === host) return null; while (n && n.parentNode !== host) n = n.parentNode; return n; }
export function is_empty_block(b) {
  return !!b && b.nodeType === 1 && !is_break(b) && !is_list(b) && !is_table(b) && !b.querySelector('img,table,hr') && b.textContent.replace(/\u200b/g, '') === '';
}
export function last_non_break(b) { let l = b.lastElementChild; while (l && (is_break(l) || is_abs(l))) l = l.previousElementSibling; return l || b; }
export function same_kind(a, b) { return !!(a && b && a.tagName === b.tagName); }
export function pad_bottom(e) { return parseFloat(getComputedStyle(e).paddingBottom) || 0; }
export function top_in(e, anc) { let y = 0; while (e && e !== anc) { y += e.offsetTop; e = e.offsetParent; } return y; }
