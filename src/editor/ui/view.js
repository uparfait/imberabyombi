/* editor/ui/view.js: page setup, zoom and mode (source "setup, zoom, mode"): apply the setup to every page (+ the print
   @page rule), zoom (and fit to width), editing / viewing, the menus row, spelling check, print. */
import { state, refs, pages_el, scroller, dims, page_wraps, bodies, layout_page, set_editable, reflow, layout_after, clamp, hist_timer, commit,
  toast, qs, el } from '../core/index.js';
import { hide_img_sel } from '../content/index.js';
