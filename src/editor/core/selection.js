/* editor/core/selection.js: the selection (source "selection"): the last range / host inside the document, save and
   restore across reflows, caret placement, caret geometry and scrolling, caret from a point, focus restore.
   last_range / last_host are live exports; other areas change them with set_last(range, host) (or the two setters). */
import { pages_el, scroller } from './refs.js';
import { bodies, body_index, editable_of, node_len, text_nodes, is_break, is_empty_block, last_non_break } from './dom.js';
import { sel_remap } from './flow.js';

export let last_range = null, last_host = null;
export function set_last(r, host) { last_range = r || null; last_host = host === undefined ? (r ? editable_of(r.startContainer) : null) : host; }
export function set_last_range(r) { last_range = r || null; }
export function set_last_host(h) { last_host = h || null; }

export function save_sel() {
  const s = getSelection(); if (!s.rangeCount || !pages_el) return null;
  const r = s.getRangeAt(0); const host = editable_of(r.startContainer);
