/* sign/signer_act.jsx: the signing page's buttons (data-act). A field of yours opens "Add your signature / stamp" (or takes
   the one you just made, in one tap); Next field scrolls to the next empty one and opens it; Finish asks you to agree,
   (and, when the sender asks for it, your digital certificate and its password, checked first: cert_pick.jsx), then
   keeps your marks, records your signature and completes the document once everyone has signed. */
import { qs } from '../lib/index.js';
