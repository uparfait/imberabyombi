/* sign/prep_act.js: the prepare page's buttons (data-act): whose fields to place, add or remove a field, the signers'
   sheet on phones, a signer's note, remove a signer, Save, and Send for signing (checked first: every signer needs a field). */
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { go } from '../router/index.js';
