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
  if (!host || !host.classList.contains('pg_body') || !pages_el.contains(host)) return null;
  return { sc: r.startContainer, so: r.startOffset, ec: r.endContainer, eo: r.endOffset, host };
}
export function restore_sel(sel) {
  if (!sel) { sel_remap.clear(); return; }
  let sc = sel_remap.get(sel.sc) || sel.sc, ec = sel_remap.get(sel.ec) || sel.ec; sel_remap.clear();
  if (!sc || !sc.isConnected) return;
  const so = Math.min(sel.so, node_len(sc)); let eo;
  if (!ec || !ec.isConnected || editable_of(ec) !== editable_of(sc)) { ec = sc; eo = so; } else eo = Math.min(sel.eo, node_len(ec));
  const host = editable_of(sc); if (!host) return;
  const s = getSelection();
  const moved = document.activeElement !== host;
  if (moved && document.activeElement && pages_el.contains(document.activeElement) === false && document.activeElement !== document.body) {
    /* focus is in a dialog or field: just remember */ last_range = mk_range(sc, so, ec, eo); last_host = host; return;
  }
  if (moved) host.focus({ preventScroll: true });
  const r = mk_range(sc, so, ec, eo); if (!r) return;
  s.removeAllRanges(); s.addRange(r);
  if (moved || sel.host !== host) scroll_caret_into_view();
}
export function mk_range(sc, so, ec, eo) {
  const r = document.createRange();
  try { r.setStart(sc, so); r.setEnd(ec, eo); } catch { try { r.setStart(sc, so); r.collapse(true); } catch { return null; } }
  return r;
}
export function set_caret(node, off) {
  const host = editable_of(node); if (host && document.activeElement !== host) host.focus({ preventScroll: true });
  const r = document.createRange(); r.setStart(node, Math.min(off, node_len(node))); r.collapse(true);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  last_range = r.cloneRange(); last_host = host;
}
export function deepest(e, first) {
  while (e && e.nodeType === 1) {
    const c = first ? e.firstElementChild : e.lastElementChild;
    if (!c || c.tagName === 'BR' || c.tagName === 'IMG' || is_break(c)) break; e = c;
