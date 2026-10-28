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
  const names = new Set(state.tabs.map(t => t.name));
  for (let n = state.tabs.length + 1; ; n++) if (!names.has('Tab ' + n)) return 'Tab ' + n;
}
export function add_tab() {
  save_tab(); const t = new_tab(next_tab_name()); state.tabs.push(t); show(t.id);
  setTimeout(() => { const b = bodies()[0]; if (b) caret_to_start(first_flow(b)); }, 30);
}
/* d: +1 next, -1 previous (wraps around) */
export function step_tab(d) {
  const n = state.tabs.length; if (n < 2) return;
  const i = state.tabs.findIndex(t => t.id === state.active);
  switch_tab(state.tabs[(i + d + n) % n].id);
}
export function duplicate(t) {
  save_tab();
  const c = duplicate_tab(t, unique_name(t.name + ' (copy)', state.tabs.map(x => x.name)));
  state.tabs.splice(state.tabs.indexOf(t) + 1, 0, c); show(c.id);
}
export function delete_tab(t) {
  if (state.tabs.length < 2) return;
  confirm_dialog(<>Delete <strong>{t.name}</strong> and its content?</>, 'Delete tab', true).then(ok => {
    const i = state.tabs.indexOf(t); if (!ok || i < 0 || state.tabs.length < 2) return;
    state.tabs.splice(i, 1); state.comments = state.comments.filter(c => c.tab !== t.id);
    if (state.active === t.id) { state.active = state.tabs[Math.max(0, i - 1)].id; render_tab(); }
    render_sidebar(); render_comments(); save_soon();
  });
}
export function tab_menu(t) {
  const i = state.tabs.indexOf(t);
  return [
    { label: 'Rename', icon: 'edit', no_preview: true, action: () => start_rename(t) },
    { label: 'Duplicate', icon: 'content_copy', no_preview: true, action: () => duplicate(t) },
    { label: 'Move up', icon: 'arrow_upward', disabled: i === 0, no_preview: true, action: () => { move_tab(i, i - 1); render_sidebar(); } },
    { label: 'Move down', icon: 'arrow_downward', disabled: i === state.tabs.length - 1, no_preview: true, action: () => { move_tab(i, i + 1); render_sidebar(); } },
    { sep: true },
    { label: 'Delete', icon: 'delete', disabled: state.tabs.length < 2, no_preview: true, action: () => delete_tab(t) }
  ];
}
/* the tab's name becomes a field in its row: Enter / leaving saves, Esc cancels */
