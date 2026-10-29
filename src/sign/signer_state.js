/* sign/signer_state.js: the signing in progress (S): the document, your marks placed but not signed yet (pending: field id
   → PNG) and the last signature and stamp you made (adopted), so the next field of the same kind takes it in one tap. It
   starts over when another document opens; nothing is kept until you sign. */
import { my_rec } from './sign_store.js';

export const S = { id: null, pending: {}, adopted: {} };
export const signer_start = id => { if (S.id !== id) Object.assign(S, { id, pending: {}, adopted: {} }); };

/* your fields, page by page, top to bottom; and the ones still empty */
export const own_fields = d => { const r = my_rec(d);
