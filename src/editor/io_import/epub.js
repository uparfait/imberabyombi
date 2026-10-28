/* editor/io_import/epub.js: EPUB → HTML: the book's chapters in reading order (at most 400), each chapter's body with
   its images inlined as data URLs (missing ones removed), chapters separated by page breaks. */
import { unzip } from './unzip.js';
import { parse_xml, by_tag, dir_of, resolve_path } from './xml_helpers.js';
import { PB } from './pptx.js';

export async function epub_to_html(file) {
  const z = await unzip(await file.arrayBuffer());
  const rf = by_tag(parse_xml(await z.text('META-INF/container.xml')), 'rootfile')[0]; if (!rf) throw new Error('the book’s table of contents is missing');
  const opf_path = rf.getAttribute('full-path'), opf = parse_xml(await z.text(opf_path)), base = dir_of(opf_path), man = {};
  by_tag(opf, 'item').forEach(it => { man[it.getAttribute('id')] = { href: it.getAttribute('href'), type: it.getAttribute('media-type') || '' }; });
  const spine = by_tag(opf, 'itemref').map(r => man[r.getAttribute('idref')]).filter(x => x && /html/.test(x.type)), parts = [];
  for (const it of spine.slice(0, 400)) {
    const path = resolve_path(base, decodeURIComponent(it.href)); if (!z.has(path)) continue;
    const d = new DOMParser().parseFromString(await z.text(path), 'text/html');
    for (const im of Array.from(d.querySelectorAll('img, image'))) {
