/* sign/prep_state.js: the draft being prepared (P): a working copy of its record (doc), the signer whose fields are being
   placed (rid), the selected field (sel), the signers' sheet on phones (sheet) and unsaved changes (dirty).
   prep_save() keeps the copy. It also saves itself a moment after each change, and when the page is left (another page
   draws, the tab closes), so nothing is lost. */
import { before_render } from '../store/index.js';
