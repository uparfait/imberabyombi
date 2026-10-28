/* editor/ui/sections.js: the document as sections for the outline: a heading (Title, Heading 1–4) and everything after
   it up to the next heading of the same or a higher level. A move or delete rewrites the whole document (the pages'
   html joined, so split lists and tables are whole again), then the pages reflow: one undo step. Only headings that sit
   directly in a page (not in a table or quote) carry a section. */
import { pages_el, bodies, qsa, collect_html, begin_op, end_op, caret_to_start } from '../core/index.js';
import { can_edit } from '../format/index.js';
import { clean_text } from './ui_dom.js';

const HEAD = 'h1, h2, h3, h4, p.title';
export function level_of(h) { return h.tagName === 'P' ? 0 : +h.tagName[1] - 1; }
/* the outline's headings in document order; a title split over two pages counts once */
export function heading_els() {
  return pages_el ? qsa('.pg_body :is(h1, h2, h3, h4, p.title)', pages_el).filter(h => clean_text(h) && !h.hasAttribute('data-cont')) : [];
}
export function is_top_head(h) { return !!(h.parentElement && h.parentElement.classList.contains('pg_body')); }

/* { c: the joined document, blocks: its top-level elements, heads: [{ i: block index, lvl, end: block index after the section }] } */
export function section_model() {
  const c = document.createElement('div'); c.innerHTML = collect_html();
  const blocks = Array.from(c.children), heads = [];
  blocks.forEach((b, i) => { if (b.matches(HEAD) && clean_text(b)) heads.push({ i, lvl: level_of(b) }); });
  heads.forEach((h, k) => { const n = heads.slice(k + 1).find(x => x.lvl <= h.lvl); h.end = n ? n.i : blocks.length; });
  return { c, blocks, heads };
}
/* where section k goes one step up / down (a block index), -1 when it cannot move */
