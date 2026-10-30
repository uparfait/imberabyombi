/* sign/sign_act.js: O-Doc Sign's buttons join the app's ACT when this code loads (add_act): the prepare page's, the signing
   page's and the document page's. Save and Download are requests: their button spins while they run (Send, Sign and
   Delete spin in their dialog's button). */
import { add_act } from '../actions/index.js';
import { PREP_ACT } from './prep_act.js';
import { SIGNER_ACT } from './signer_act.jsx';
import { DOC_ACT } from './doc_act.js';
import { SELF_ACT } from './self_sign.jsx';

add_act({ ...PREP_ACT, ...SIGNER_ACT, ...DOC_ACT, ...SELF_ACT }, { sign_save: 1, sign_dl: 1 });
