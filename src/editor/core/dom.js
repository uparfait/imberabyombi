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
