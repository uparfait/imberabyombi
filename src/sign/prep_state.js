/* sign/prep_state.js: the draft being prepared (P): a working copy of its record (doc), the signer whose fields are being
   placed (rid), the selected field (sel), unsaved changes (dirty) and whether the
   form that adds a signer is open (adding: always, while there is no signer).
   prep_save() keeps the copy. It also saves itself a moment after each change, and when the page is left (another page
   draws, the tab closes), so nothing is lost. */
import { before_render } from '../store/index.js';
import { find_doc, save_doc, recolor } from './sign_store.js';

export const P = { doc: null, rid: null, sel: null, dirty: false, adding: false };

/* the copy of draft id (made once, when its page opens) */
export function prep_start(id) {
