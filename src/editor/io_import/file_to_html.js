/* editor/io_import/file_to_html.js: one file → { html, inline?, kind?, note?, project? } by its type: images, Word,
   PDF, spreadsheets, CSV / TSV, JSON (+ lines), PowerPoint, OpenDocument, RTF, EPUB, web pages, Markdown, text, code;
   old binary formats and anything else become a downloadable attachment chip. */
import { read_as_data_url } from '../core/index.js';
import { IMG_EXT, CODE_EXT, MIME, ext_of, base_of, fmt_size } from './file_helpers.js';
import { text_to_html, md_to_html } from './text_md.js';
import { pdf_to_html } from './pdf_import.js';
import { fit_img_html, csv_to_html, code_to_html } from './tables.js';
import { json_to_html, MAX_ATTACH, attachment_html } from './json_attach.js';
import { sheet_to_html } from './sheets.js';
import { docx_to_html } from './docx.js';
import { pptx_to_html } from './pptx.js';
import { odf_to_html } from './odf.js';
import { epub_to_html } from './epub.js';
import { rtf_to_html } from './rtf.js';

/* the first 4 KB: no zero bytes and under 2% control characters */
export async function looks_like_text(file) {
  const b = new Uint8Array(await file.slice(0, 4096).arrayBuffer()); if (!b.length) return true;
  let bad = 0; for (const x of b) { if (x === 0) return false; if (x < 9 || (x > 13 && x < 32)) bad++; }
  return bad / b.length < 0.02;
}
const json_lines = text => JSON.stringify(text.split(/\r?\n/).filter(l => l.trim()).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(x => x != null));

export async function file_to_html(file) {
  const name = file.name, ext = ext_of(name);
  if (file.type.startsWith('image/') || IMG_EXT.has(ext)) {
    if (file.size > MAX_ATTACH) throw new Error(`it is ${fmt_size(file.size)}; images can be up to 25 MB`);
    let url = await read_as_data_url(file); if (!/^data:image\//.test(url) && MIME[ext]) url = url.replace(/^data:[^;,]*/, 'data:' + MIME[ext]);
    return { kind: 'image', html: await fit_img_html(url, base_of(name)), inline: await fit_img_html(url, base_of(name), true) };
  }
  switch (ext) {
    case 'docx': case 'docm': case 'dotx': case 'dotm': return docx_to_html(file);
    case 'pdf': return { html: await pdf_to_html(await file.arrayBuffer()) };
    case 'xlsx': case 'xlsm': case 'xlsb': case 'xls': case 'ods': case 'fods': case 'numbers': return sheet_to_html(file, ext);
    case 'csv': return csv_to_html(await file.text());
    case 'tsv': case 'tab': return csv_to_html(await file.text(), '\t');
    case 'json': case 'geojson': return json_to_html(await file.text(), name);
    case 'jsonl': case 'ndjson': return json_to_html(json_lines(await file.text()), name);
    case 'pptx': case 'pptm': case 'ppsx': return { html: await pptx_to_html(file) };
    case 'odt': case 'ott': case 'odp': return { html: await odf_to_html(file) };
    case 'rtf': return { html: rtf_to_html(await file.text()) };
    case 'epub': return { html: await epub_to_html(file) };
    case 'html': case 'htm': case 'xhtml': return { html: await file.text() };
    case 'md': case 'markdown': case 'mdown': return { html: md_to_html(await file.text()) };
    case 'txt': case 'text': return { html: text_to_html(await file.text()) };
  }
  if (CODE_EXT.has(ext) || /^(dockerfile|makefile|readme|license|changelog)$/i.test(name)) return { html: code_to_html(await file.text(), name) };
  if (['doc', 'ppt', 'pages', 'key', 'wpd', 'wps'].includes(ext)) {
