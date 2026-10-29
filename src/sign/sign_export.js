/* sign/sign_export.js: the PDF to download: the uploaded file with every signature and stamp placed so far drawn into its
   pages, and on a completed document a last page, the signing certificate (sign_cert.js). pdf-lib does the writing; it
   loads from the CDN the first time someone downloads. A mark keeps its shape inside its field and lands where it was
   placed on any page, rotated pages included. */
import { load_script } from '../editor/core/utils.js';
import { file_get } from './sign_idb.js';
import { certificate } from './sign_cert.js';

const PDF_LIB = ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js', 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'];

/* field f (fractions of the page as shown) → where pdf-lib draws the image on the page as stored (origin bottom left) */
function place(page, f, img, degrees) {
