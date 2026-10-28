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
  if (!r) { r = own_rule = el('style', { id: 'page_rule' }); document.head.appendChild(r); }
  return r;
}
export function drop_page_rule() { if (own_rule) own_rule.remove(); own_rule = null; }

export function apply_setup(full) {
  if (!pages_el) return;
  const { win, hin } = dims(), s = state.setup, m = s.margins;
  page_rule_el().textContent = s.pageless ? `@page{size:${win}in ${hin}in;margin:${m.top}in ${m.right}in ${m.bottom}in ${m.left}in}` : `@page{size:${win}in ${hin}in;margin:0}`;
  pages_el.classList.toggle('pageless', !!s.pageless);
  page_wraps().forEach(w => { layout_page(w); qs('.pg_header', w).innerHTML = s.header_html || ''; qs('.pg_footer_text', w).innerHTML = s.footer_html || ''; });
  if (full) reflow(0, true); else layout_after();
  update_rulers();
}
export function set_zoom(z) {
  state.zoom = clamp(z, 0.25, 3); set_text(refs.zoom_label, Math.round(state.zoom * 100) + '%');
  if (!pages_el) return;
  page_wraps().forEach(layout_page); layout_after(); update_rulers();
}
export function zoom_fit() {
  if (!scroller) return;
  const avail = scroller.clientWidth - (parseFloat(scroller.style.paddingLeft) || 0) - (parseFloat(scroller.style.paddingRight) || 0) - scaled(56);
  set_zoom(Math.floor(avail / dims().w * 100) / 100);
}
export function set_mode(mode) {
  state.mode = mode; page_wraps().forEach(set_editable); hide_img_sel();
  if (refs.toolbar) refs.toolbar.classList.toggle('viewing', mode !== 'edit');
  set_icon(refs.mode_icon, mode === 'edit' ? 'edit' : 'visibility');
  set_text(refs.mode_label, mode === 'edit' ? 'Editing' : 'Viewing');
  toast(mode === 'edit' ? 'Editing: you can make changes' : 'Viewing: the document is read-only', 1800);
}
export function toggle_menus() {
