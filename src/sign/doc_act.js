/* sign/doc_act.js: the document page's buttons (data-act): copy the signing link (signers open it, sign in with their
   email and land on the document), download the PDF with the marks placed so far (a completed one with its certificate),
   delete the document with its PDF and marks (only while nobody has signed it), and archive or restore a signed one. */
import { notify } from '../feedback/index.js';
import { rerender } from '../store/index.js';
import { ask, copy } from '../overlays/index.js';
import { base_url } from '../auth/index.js';
import { go } from '../router/index.js';
import { find_doc, drop_doc, save_doc, log, who, kept_for_good } from './sign_store.js';
import { drop_files, marks_get } from './sign_idb.js';
import { forget_pdf } from './pdf_lib.js';
import { signed_pdf, save_pdf } from './sign_export.js';

export const DOC_ACT = {
  sign_link: t => copy(base_url(`/admin/sign/sign/${t.dataset.id}`), 'Signing link'),
  sign_dl: async t => {
