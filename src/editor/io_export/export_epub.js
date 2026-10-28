/* editor/io_export/export_epub.js: EPUB e-book (.epub): each tab (or just the open one) is a chapter with the document's
   own styles; images become files in the book (others are dropped); a contents page lists the chapters. */
import { state, active_tab, el, qsa, uid, download, hist_timer, commit } from '../core/index.js';
import { save_tab } from '../ui/index.js';
import { b64bytes } from '../io_import/index.js';
import { CONTENT_CSS } from './content_css.js';
import { unwrap_comments } from './project_file.js';
import { prepare_images } from './docx_image.js';
import { xesc } from './docx_runs.js';
import { zip_store } from './zip_store.js';
import { epub_chapter, EPUB_CONTAINER, epub_opf, epub_nav } from './epub_parts.js';

export async function export_epub(scope, name) {
  if (hist_timer) commit(); save_tab();
  const tabs = scope === 'all' ? state.tabs : [active_tab()], ser = new XMLSerializer(), files = [], manifest = [], spine = [], nav = [], imgs = [];
  let img_n = 0;
  const css = CONTENT_CSS.replace(/white-space:pre-wrap;?/, '') + 'body{margin:0 4%}.doc_content .page_break{page-break-after:always}';
  for (let i = 0; i < tabs.length; i++) {
    const t = tabs[i], d = el('div'); d.innerHTML = t.html; unwrap_comments(d);
    qsa('.file_chip', d).forEach(a => a.replaceWith(document.createTextNode(a.textContent)));
