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
