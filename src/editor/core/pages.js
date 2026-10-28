/* editor/core/pages.js: page boxes (source "pages"): build a page (header, body, footer, number), lay it out for the
   paper size / margins / zoom / pageless mode, make it editable or read-only, add / remove pages, number them. */
import { DPI } from './constants.js';
import { qs, qsa, el } from './utils.js';
import { state, dims } from './state.js';
import { bodies } from './dom.js';

export function create_page() {
  const wrap = el('div', { class: 'page_wrap' });
  wrap.innerHTML = '<div class="page"><div class="pg_header" data-ph="Header"></div><div class="pg_body doc_content"></div>'
    + '<div class="pg_footer"><div class="pg_footer_text" data-ph="Footer"></div><span class="pg_num"></span></div></div>';
  qs('.pg_header', wrap).innerHTML = state.setup.header_html;
  qs('.pg_footer_text', wrap).innerHTML = state.setup.footer_html;
  layout_page(wrap); set_editable(wrap);
  return wrap;
}
export function layout_page(wrap) {
  const { w, h } = dims(), s = state.setup, m = s.margins, z = state.zoom;
  const page = wrap.firstElementChild, body = qs('.pg_body', page), hd = qs('.pg_header', page), ft = qs('.pg_footer', page);
  page.style.width = w + 'px';
  page.style.background = s.page_color || '#fff';
  page.style.transform = z === 1 ? '' : `scale(${z})`;
  if (s.pageless) {
    page.style.height = 'auto'; page.style.minHeight = h + 'px';
    Object.assign(body.style, { position: 'relative', top: '', bottom: '', left: '', right: '',
      margin: `${m.top * DPI}px ${m.right * DPI}px ${m.bottom * DPI}px ${m.left * DPI}px`, minHeight: (h - (m.top + m.bottom) * DPI) + 'px' });
    hd.style.display = 'none'; ft.style.display = 'none';
