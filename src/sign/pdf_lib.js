/* sign/pdf_lib.js: reading and drawing PDFs with pdf.js, the copy the document editor loads from the CDN on first use
   (one download serves both). read_pdf(bytes) checks a new upload and measures its pages; open_pdf(id) opens a
   document's file once per visit; draw_page() paints a page into a canvas at the width it is shown, sharp on dense screens. */
import { load_script } from '../editor/core/utils.js';
import { LIB, PDFJS_WORKER } from '../editor/core/constants.js';
import { file_get } from './sign_idb.js';

export const pdfjs = async () => {
