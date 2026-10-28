/* editor/ui/tabs.jsx: document tabs (source "sidebar: tabs"): switch, add (unique names "Tab 2", "Tab 3"…), step with
   Ctrl+PageDown / PageUp, the tab menu (Rename, Duplicate, Move up / down, Delete: never the last tab) and renaming in
   place. Every change is saved with the document (save_soon; move_tab saves by itself). */
import { state, refs, active_tab, new_tab, duplicate_tab, move_tab, collect_html, hist_timer, commit, bodies, first_flow, caret_to_start,
  el, save_soon } from '../core/index.js';
import { render_comments } from '../content/index.js';
import { render_tab } from './render.js';
import { render_sidebar } from './sidebar.js';
import { confirm_dialog } from './dialogs.jsx';
import { unique_name } from './ui_dom.js';

export function save_tab() { const t = active_tab(); if (t) t.html = collect_html(); }

function show(id) { state.active = id; render_tab(); render_sidebar(); render_comments(); save_soon(); }
export function switch_tab(id) {
  if (id === state.active || !state.tabs.some(t => t.id === id)) return;
  if (hist_timer) commit();
  save_tab(); show(id);
}
/* "Tab n": n from the tab count up, the first one not taken */
export function next_tab_name() {
