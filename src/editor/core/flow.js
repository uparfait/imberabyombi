/* editor/core/flow.js: pagination engine, part 1 (source "pagination engine").
   Content lives in one contenteditable body per page. After each edit we push overflowing blocks to the next page
   and pull blocks back when there is room. Paragraphs, lists and tables can be split across pages; split parts carry
   data-cont="1" and are re-joined on save/export. This part: measuring, cleaning a body, moving / merging blocks.
   Absolute images (front / behind text) are skipped everywhere: never wrapped, measured or moved. */
import { BLOCK_RE, TEXT_BLOCK_RE } from './constants.js';
import { is_break, is_list, is_table, is_abs, is_empty_block, same_kind, pad_bottom, top_in, first_flow, last_flow, prev_flow } from './dom.js';

export let cur_sel = null;            // selection being preserved during reflow
export function set_cur_sel(v) { cur_sel = v; }
export const sel_remap = new Map();   // old element -> replacement element

export function content_bottom(b) {
  const l = last_flow(b); let y = l ? l.offsetTop + l.offsetHeight - pad_bottom(l) : 0;
  for (const im of b.querySelectorAll('img[data-pos="wrap_left"],img[data-pos="wrap_right"]')) { const t = top_in(im, b) + im.offsetHeight; if (t > y) y = t; }
  return y;
}
export function overflows(b) { return !!last_flow(b) && content_bottom(b) > b.clientHeight + 1; }
export function items_of(c) { return is_table(c) ? Array.from((c.tBodies[0] || c).rows || []) : Array.from(c.children); }
export function item_parent(c) { return is_table(c) ? (c.tBodies[0] || c) : c; }

export function normalize_body(b) {
  let p = null;
  for (const n of Array.from(b.childNodes)) {
    if (n.nodeType === 8) { n.remove(); continue; }
    if (is_abs(n)) continue;
    if (n.nodeType === 1 && BLOCK_RE.test(n.tagName)) {
      p = null;
      if (n.tagName === 'DIV' && !is_break(n)) div_to_block(n);
      continue;
    }
    if (n.nodeType === 3 && !p && /^[\s]*$/.test(n.data) && !(cur_sel && (cur_sel.sc === n || cur_sel.ec === n))) { n.remove(); continue; }
    if (!p) { p = document.createElement('p'); b.insertBefore(p, n); }
    p.appendChild(n);
  }
}
export function hoist_nested(b) {
  const NEST = /^(UL|OL|TABLE|HR|P|H[1-6]|BLOCKQUOTE|PRE)$/;
  for (let g = 0; g < 200; g++) {
    const p = Array.from(b.children).find(x => TEXT_BLOCK_RE.test(x.tagName) && !is_break(x) && Array.from(x.children).some(c => NEST.test(c.tagName)));
    if (!p) return;
    const inner = Array.from(p.children).find(c => NEST.test(c.tagName));
    const before = p.cloneNode(false), after = p.cloneNode(false); after.removeAttribute('data-cont');
    while (p.firstChild !== inner) before.appendChild(p.firstChild);
    while (inner.nextSibling) after.appendChild(inner.nextSibling);
    p.before(before); p.after(after); p.replaceWith(inner);
    [before, after].forEach(x => { if (!x.textContent.replace(/\u200b/g, '').trim() && !x.querySelector('img')) x.remove(); });
  }
}
export function div_to_block(d) {
  if (Array.from(d.children).some(c => BLOCK_RE.test(c.tagName))) { d.replaceWith(...d.childNodes); return; }
  const p = document.createElement('p');
  if (d.getAttribute('style')) p.setAttribute('style', d.getAttribute('style'));
  while (d.firstChild) p.appendChild(d.firstChild);
