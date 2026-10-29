/* sign/doc_act.js: the document page's buttons (data-act): copy the signing link (signers open it, sign in with their
   email and land on the document), download the PDF with the marks placed so far (a completed one with its certificate),
   and delete the document with its PDF and marks. */
import { notify } from '../feedback/index.js';
import { ask, copy } from '../overlays/index.js';
import { base_url } from '../auth/index.js';
import { go } from '../router/index.js';
