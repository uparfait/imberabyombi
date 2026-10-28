/* editor/core/start.js: editor_start(root) (source "start"): fills refs, restores the saved document, installs every
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
import { restore_doc, reset_doc, save_doc, save_soon } from './persist.js';
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
