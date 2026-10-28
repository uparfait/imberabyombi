/* editor/ui/render.js: drawing a tab and the whole document (source "rendering a tab / document"): the active tab's html
   into a fresh first page (the reflow makes the rest), the title, setup, side panels and comments; new_document() starts
   over after a confirm. */
import { state, refs, pages_el, scroller, active_tab, create_page, reflow, commit, deepest, first_flow, set_last, schedule_ui, default_setup,
  new_tab, qs, save_soon } from '../core/index.js';
import { hide_img_sel, render_comments } from '../content/index.js';
import { apply_setup } from './view.js';
import { update_rulers } from './rulers.js';
import { render_sidebar } from './sidebar.js';
import { apply_panels } from './pages_panel.js';
import { close_menus } from './menu_engine.js';
import { confirm_dialog } from './dialogs.jsx';

export function render_tab() {
  if (!pages_el) return;
  hide_img_sel(); close_menus(0); pages_el.innerHTML = '';
  const t = active_tab(); if (!t) return;
  if (!Array.isArray(t.undo)) t.undo = []; if (!Array.isArray(t.redo)) t.redo = [];
  const w = create_page(); pages_el.appendChild(w);
  const b = qs('.pg_body', w); b.innerHTML = t.html || '<p><br></p>';
  reflow(0, true);
