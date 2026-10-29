/* sign/signer_act.jsx: the signing page's buttons (data-act). A field of yours opens "Add your signature / stamp" (or takes
   the one you just made, in one tap); Next field scrolls to the next empty one and opens it; Finish asks you to agree,
   then keeps your marks, records your signature and completes the document once everyone has signed. */
import { qs } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { notify, form_msg } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
import { go } from '../router/index.js';
import { find_doc, my_rec, KINDS, log, save_doc } from './sign_store.js';
import { marks_get, file_set } from './sign_idb.js';
import { S, own_fields, left_of } from './signer_state.js';
