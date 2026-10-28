/* editor/core/dom.js: DOM helpers (source "DOM helpers"): node tests, the page bodies, editable host of a node,
   text nodes and character offsets inside a block, top-level blocks, and element offsets inside an ancestor.
   Absolute images (data-pos front / behind, direct children of .pg_body) are not part of the text flow: the flow
   helpers (first_flow, last_flow, prev_flow, flow_kids) skip them, and the pagination engine never moves them. */
import { qsa } from './utils.js';
import { pages_el } from './refs.js';
