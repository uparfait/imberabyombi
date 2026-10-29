/* sign/sign_export.js: the PDF to download: the uploaded file with every signature and stamp placed so far drawn into its
   pages, and on a completed document a last page, the signing certificate (sign_cert.js). pdf-lib does the writing; it
   loads from the CDN the first time someone downloads. A mark keeps its shape inside its field and lands where it was
   placed on any page, rotated pages included. */
import { load_script } from '../editor/core/utils.js';
import { file_get } from './sign_idb.js';
