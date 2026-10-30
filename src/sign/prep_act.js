/* sign/prep_act.js: the prepare page's buttons (data-act): whose fields to place, add or remove a field, edit or remove a
   signer, Save, and Send for signing (checked first: every signer needs a field). */
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { go } from '../router/index.js';
import { rec_of, log, who, recolor } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
