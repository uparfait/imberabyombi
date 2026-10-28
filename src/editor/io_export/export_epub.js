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
    qsa('[contenteditable]', d).forEach(x => x.removeAttribute('contenteditable'));
    await prepare_images(d);
    qsa('img', d).forEach(img => {
      const m = (img.getAttribute('src') || '').match(/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,(.*)$/i); if (!m) { img.remove(); return; }
      const mt = m[1].toLowerCase() === 'jpg' ? 'jpeg' : m[1].toLowerCase(), ext = mt.replace('jpeg', 'jpg').replace('svg+xml', 'svg'), fn = `images/img${++img_n}.${ext}`;
      imgs.push({ name: 'OEBPS/' + fn, data: b64bytes(m[2]), type: 'image/' + mt });
      img.setAttribute('src', fn); img.removeAttribute('data-nw'); img.removeAttribute('data-nh'); if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
    });
    const title = tabs.length > 1 ? t.name : state.title;
    const xb = Array.from(d.childNodes).map(n => n.nodeType === 3 ? xesc(n.data) : n.nodeType === 1 ? ser.serializeToString(n) : '').join('');
    files.push({ name: `OEBPS/ch${i + 1}.xhtml`, data: epub_chapter(title, xb) });
    manifest.push(`<item id="ch${i + 1}" href="ch${i + 1}.xhtml" media-type="application/xhtml+xml"/>`); spine.push(`<itemref idref="ch${i + 1}"/>`);
    nav.push(`<li><a href="ch${i + 1}.xhtml">${xesc(title)}</a></li>`);
  }
  const id = (crypto.randomUUID && crypto.randomUUID()) || uid() + uid(), now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const out = [
    { name: 'mimetype', data: 'application/epub+zip' },
    { name: 'META-INF/container.xml', data: EPUB_CONTAINER },
    { name: 'OEBPS/content.opf', data: epub_opf(id, state.title, now, manifest, imgs, spine) },
