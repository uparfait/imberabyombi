/* editor/core/schedule.js: scheduled work (source "scheduled work"): one reflow per animation frame from the lowest
   page that changed, and the side panels (outline, pages, comment states, find highlights) refreshed after a pause. */
import { pages_el } from './refs.js';
import { reflow } from './reflow.js';
import { render_outline, render_pages_panel, find_state, run_find } from '../ui/index.js';
import { refresh_comment_states } from '../content/index.js';

export let reflow_raf = 0;
let reflow_from = null;
export function schedule_reflow(i) {
  reflow_from = reflow_from == null ? i : Math.min(reflow_from, i);
  if (!reflow_raf) reflow_raf = requestAnimationFrame(() => { reflow_raf = 0; const f = reflow_from; reflow_from = null; reflow(f); });
}
export let ui_timer = null;
export function schedule_ui() {
  clearTimeout(ui_timer);
  ui_timer = setTimeout(() => {
    ui_timer = null; if (!pages_el) return;
    render_outline(); render_pages_panel(); refresh_comment_states(); if (find_state.open) run_find(true);
