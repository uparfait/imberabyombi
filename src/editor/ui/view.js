/* editor/ui/view.js: page setup, zoom and mode (source "setup, zoom, mode"): apply the setup to every page (+ the print
   @page rule), zoom (and fit to width), editing / viewing, the menus row, spelling check, print. */
import { state, refs, pages_el, scroller, dims, page_wraps, bodies, layout_page, set_editable, reflow, layout_after, clamp, hist_timer, commit,
  toast, qs, el } from '../core/index.js';
import { hide_img_sel } from '../content/index.js';
import { close_menus } from './menu_engine.js';
import { update_rulers } from './rulers.js';
import { set_text, set_icon, scaled } from './ui_dom.js';

/* the print page size lives in a <style id="page_rule"> (created in <head> when the chrome has none; removed on stop) */
let own_rule = null;
export function page_rule_el() {
  let r = document.getElementById('page_rule');
