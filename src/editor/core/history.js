/* editor/core/history.js: undo / redo per tab (source "history (per tab)"). A snapshot is every page body's html plus
   the caret as a node path. Typing commits after a pause (commit_soon); operations wrap in begin_op / end_op.
   While a live preview runs (live.js) nothing is recorded; every real commit saves the document (debounced). */
import { state, active_tab } from './state.js';
import { pages_el } from './refs.js';
import { bodies, page_wraps, editable_of } from './dom.js';
import { create_page } from './pages.js';
import { reflow, layout_after } from './reflow.js';
import { set_caret, scroll_caret_into_view, current_page } from './selection.js';
import { live, live_busy } from './live.js';
import { save_soon } from './persist.js';
import { refresh_toolbar } from '../ui/index.js';
import { hide_img_sel } from '../content/index.js';

export let hist_timer = null;
export function path_to(root, node) {
  const p = [];
  while (node && node !== root) { if (!node.parentNode) return null; p.unshift(Array.prototype.indexOf.call(node.parentNode.childNodes, node)); node = node.parentNode; }
  return node === root ? p : null;
}
export function node_at(root, path) { let n = root; for (const i of path) { if (!n || !n.childNodes[i]) return null; n = n.childNodes[i]; } return n; }
export function snapshot() {
  const bs = bodies(), s = getSelection(); let caret = null;
  if (s.rangeCount) {
    const r = s.getRangeAt(0), h = editable_of(r.startContainer), i = bs.indexOf(h);
    if (i >= 0) { const p = path_to(h, r.startContainer); if (p) caret = { i, path: p, off: r.startOffset }; }
  }
  return { html: bs.map(b => b.innerHTML), caret };
}
export function commit() {
  if (live_busy()) return;   // previews never enter the undo stack
  clearTimeout(hist_timer); hist_timer = null;
  const t = active_tab(); if (!t || !pages_el) return;
  const s = snapshot(), top = t.undo[t.undo.length - 1];
  if (top && top.html.length === s.html.length && top.html.every((h, i) => h === s.html[i])) { top.caret = s.caret; return; }
  t.undo.push(s); if (t.undo.length > 300) t.undo.shift(); t.redo = [];
  save_soon();
}
export function commit_soon() { if (live_busy()) return; clearTimeout(hist_timer); hist_timer = setTimeout(commit, 450); }
export function begin_op() { if (hist_timer) commit(); }
export function end_op(pi, full = false) { reflow(pi == null ? current_page() : pi, full); commit(); refresh_toolbar(); }
