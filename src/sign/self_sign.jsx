/* sign/self_sign.jsx: signing your own draft. In the prepare page's right column, under Save draft: Sign it myself (you
   join the signers as "You", picked under Placing for, so the fields you place are yours), then Sign my fields (the
   signing page, with every step: your signature or stamp drawn, typed, uploaded or made, the agreement and, if forced,
   the certificate; it brings you back to the draft), then "Signed by you". You can go on adding other signers and send
   it to them; your fields stay as signed. Preview (at the bottom of the column, once someone has signed): the document
   with the marks so far, and Download a copy. SELF_ACT: its buttons. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { show_in_dialog } from '../overlays/index.js';
import { go } from '../router/index.js';
import { find_doc, who, add_rec } from './sign_store.js';
