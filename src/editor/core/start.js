/* editor/core/start.js: editor_start(root) (source "start"): fills refs, loads the saved document, installs every
   area's listeners, draws everything, then the source's start steps. Returns stop(): saves and removes every listener. */
import { state, active_tab } from './state.js';
import { fill_refs, clear_refs, pages_el } from './refs.js';
import { bodies, body_index, first_flow } from './dom.js';
import { reflow } from './reflow.js';
import { collect_html } from './collect.js';
import { caret_to_start } from './selection.js';
import { hist_timer, commit } from './history.js';
import { schedule_reflow, cancel_scheduled } from './schedule.js';
import { live } from './live.js';
import { load_doc, reset_doc, save_doc, save_soon, set_ready } from './persist.js';
import { toast_cleanup } from './toast.js';
import { install_content, img_sel, position_img_box } from '../content/index.js';
import { install_ui, render_all, update_rulers } from '../ui/index.js';
import * as format from '../format/index.js';
import * as io_import from '../io_import/index.js';

let running = null;   // the stop() of the editor on screen (one at a time)

export function editor_start(root) {
  if (running) running();
  fill_refs(root);
  if (!restore_doc()) reset_doc();
  Object.assign(state, { zoom: 1, mode: 'edit', menus: false, spell: true });   // fresh markup = the source's start view
  const offs = [];
  const on = (t, ev, fn, opt) => { t.addEventListener(ev, fn, opt); offs.push(() => t.removeEventListener(ev, fn, opt)); };
  for (const install of [install_content, install_ui, format.install_format, io_import.install_import]) {
    if (typeof install !== 'function') continue;
    try { const off = install(); if (typeof off === 'function') offs.push(off); } catch (e) { console.error(e); }
  }
  if (pages_el) {
    /* a picture that finishes loading reflows its page */
    on(pages_el, 'load', e => {
      if (e.target.tagName !== 'IMG') return;
      const b = e.target.closest('.pg_body'); if (b) schedule_reflow(Math.max(0, body_index(b)));
      if (e.target === img_sel) position_img_box();
    }, true);
    /* a key pressed in the document ends a running preview first */
    on(pages_el, 'keydown', () => { if (live.active) live.cancel(); }, true);
  }
  const title_saved = e => { if (e.target && e.target.id === 'doc_title') save_soon(); };
  if (root) { on(root, 'input', title_saved); on(root, 'change', title_saved); }
  on(window, 'pagehide', () => save_doc());
  on(document, 'visibilitychange', () => { if (document.visibilityState === 'hidden') save_doc(); });

  /* ================= start ================= */
  try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* not supported */ }
  render_all();
  let stopped = false;
  const t0 = setTimeout(() => { const b = bodies()[0]; if (b) caret_to_start(first_flow(b)); }, 60);
  if (document.fonts) document.fonts.ready.then(() => { if (!stopped) { reflow(0, true); update_rulers(); } });

  function stop() {
    if (stopped) return;
    stopped = true; if (running === stop) running = null;
    clearTimeout(t0);
    live.cancel();
    if (hist_timer) commit();
    const t = active_tab(); if (t && pages_el) t.html = collect_html();   // later saves (no pages) stay right
    save_doc(true);
    cancel_scheduled();
    offs.reverse().forEach(f => { try { f(); } catch (e) { console.error(e); } });
    toast_cleanup();
    clear_refs();
  }
  running = stop;
  return stop;
}
