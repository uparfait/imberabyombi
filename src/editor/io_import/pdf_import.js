/* editor/io_import/pdf_import.js: PDF → HTML with pdf.js (loaded on first use from the CDN): the text of each page,
   lines joined into paragraphs, larger lines as headings, a page break between pages. */
import { load_script, LIB, PDFJS_WORKER, toast, esc_html } from '../core/index.js';
import { PB } from './pptx.js';

/* the text lines of one page: { text, y, h } (h = the tallest text on the line) */
