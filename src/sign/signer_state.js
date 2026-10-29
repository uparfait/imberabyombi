/* sign/signer_state.js: the signing in progress (S): the document, your marks placed but not signed yet (pending: field id
   → PNG) and the last signature and stamp you made (adopted), so the next field of the same kind takes it in one tap. It
   starts over when another document opens; nothing is kept until you sign. */
import { my_rec } from './sign_store.js';
