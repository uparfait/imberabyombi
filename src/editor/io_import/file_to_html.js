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
