/* sign/prep_state.js: the draft being prepared (P): a working copy of its record (doc), the signer whose fields are being
   placed (rid), the selected field (sel), the signers' sheet on phones (sheet) and unsaved changes (dirty).
   prep_save() keeps the copy. It also saves itself a moment after each change, and when the page is left (another page
   draws, the tab closes), so nothing is lost. */
import { before_render } from '../store/index.js';
import { find_doc, save_doc } from './sign_store.js';

export const P = { doc: null, rid: null, sel: null, sheet: false, dirty: false };

/* the copy of draft id (made once, when its page opens) */
export function prep_start(id) {
  if (P.doc?.id === id) return P.doc;
  const d = find_doc(id);
  Object.assign(P, { doc: d, rid: d?.recipients[0]?.id || null, sel: null, sheet: false, dirty: false });
  return d;
}
let later = 0;
/* a change not saved yet: the "Unsaved" chip shows at once (the next draw keeps it); it is saved 1.5 s after the last one */
export const prep_dirty = () => {
  P.dirty = true; document.querySelector('[data-unsaved]')?.removeAttribute('hidden');
  clearTimeout(later); later = setTimeout(() => { if (P.dirty) prep_save(); }, 1500);
};
export const prep_save = () => {
