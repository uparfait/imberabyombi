/* sign/pdf_lib.js: reading and drawing PDFs with pdf.js, the copy the document editor loads from the CDN on first use
   (one download serves both). read_pdf(bytes) checks a new upload and measures its pages; open_pdf(id) opens a
   document's file once per visit; draw_page() paints a page into a canvas at the width it is shown, sharp on dense screens. */
import { load_script } from '../editor/core/utils.js';
import { LIB, PDFJS_WORKER } from '../editor/core/constants.js';
import { file_get } from './sign_idb.js';

export const pdfjs = async () => {
  await load_script(LIB.pdfjs); const lib = window.pdfjsLib; lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER; return lib;
};
/* pdf.js takes the bytes over (to its worker), so it gets a copy */
const parse = async bytes => (await pdfjs()).getDocument({ data: new Uint8Array(bytes).slice() }).promise;

/* a new upload: its pages' sizes in points, as shown ({ w, h }, rotation applied); throws for a file that is not a PDF */
export async function read_pdf(bytes) {
  const pdf = await parse(bytes), pages = [];
  try {
    for (let i = 1; i <= pdf.numPages; i++) {
      const v = (await pdf.getPage(i)).getViewport({ scale: 1 }); pages.push({ w: Math.round(v.width), h: Math.round(v.height) });
    }
  } finally { pdf.destroy(); }
  return pages;
}

const OPEN = new Map();
/* the open PDF of document id (a promise, shared by every page of the visit) */
export function open_pdf(id) {
  if (!OPEN.has(id)) {
