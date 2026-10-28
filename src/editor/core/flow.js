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
