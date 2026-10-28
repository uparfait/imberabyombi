/* editor/io_import/file_to_html.js: one file → { html, inline?, kind?, note?, project? } by its type: images, Word,
   PDF, spreadsheets, CSV / TSV, JSON (+ lines), PowerPoint, OpenDocument, RTF, EPUB, web pages, Markdown, text, code;
   old binary formats and anything else become a downloadable attachment chip. */
import { read_as_data_url } from '../core/index.js';
import { IMG_EXT, CODE_EXT, MIME, ext_of, base_of, fmt_size } from './file_helpers.js';
import { text_to_html, md_to_html } from './text_md.js';
