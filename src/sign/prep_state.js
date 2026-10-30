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
  if (P.doc?.id === id) return P.doc;
  const d = find_doc(id);
  /* drafts made before colours came from emails take theirs */
  if (d?.status === 'draft') { const was = d.recipients.map(r => r.color).join(); recolor(d); if (d.recipients.map(r => r.color).join() !== was) save_doc(d); }
  /* it opens on the signer whose fields were being placed when it was saved (d.placing), else the first */
  return d;
}
let later = 0;
/* a change not saved yet: the "Unsaved" chip shows at once (the next draw keeps it); it is saved 1.5 s after the last one */
export const prep_dirty = () => {
  P.dirty = true; document.querySelector('[data-unsaved]')?.removeAttribute('hidden');
  clearTimeout(later); later = setTimeout(() => { if (P.dirty) prep_save(); }, 1500);
};
export const prep_save = () => {
  clearTimeout(later); if (!P.doc) return;
  save_doc(P.doc); P.dirty = false; document.querySelector('[data-unsaved]')?.setAttribute('hidden', '');
};
const leave = () => { if (P.dirty) prep_save(); P.doc = null; };

before_render(keep => { if (!keep) leave(); });
addEventListener('pagehide', () => { if (P.dirty) prep_save(); });
