/* editor/io_export/epub_parts.js: the EPUB 3 package files: the chapter page, container.xml, the package (content.opf)
   with its manifest and spine, and the table of contents (nav.xhtml). */
import { xesc } from './docx_runs.js';

const XHTML_HEAD = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n'
  + '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en"';

/* one tab = one chapter; xb is the tab's content as XHTML */
export const epub_chapter = (title, xb) => XHTML_HEAD + ' xml:lang="en"><head><meta charset="UTF-8"/>'
  + `<title>${xesc(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>`
  + `<body><section class="doc_content">${xb}</section></body></html>`;

export const EPUB_CONTAINER = '<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
  + '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>';

export const epub_opf = (id, title, now, manifest, imgs, spine) => '<?xml version="1.0" encoding="UTF-8"?>'
  + '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/">'
  + `<dc:identifier id="bookid">urn:uuid:${id}</dc:identifier><dc:title>${xesc(title)}</dc:title><dc:language>en</dc:language>`
  + `<meta property="dcterms:modified">${now}</meta></metadata>`
