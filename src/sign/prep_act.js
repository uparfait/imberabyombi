/* sign/prep_act.js: the prepare page's buttons (data-act): whose fields to place, add or remove a field, the signers'
   sheet on phones, a signer's note, remove a signer, Save, and Send for signing (checked first: every signer needs a field). */
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { go } from '../router/index.js';
import { rec_of, log, who } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
import { add_field, del_field } from './prep_fields.js';
import { note_body, send_body } from './prep_dialogs.jsx';

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
