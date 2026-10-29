/* sign/prep_fields.js: adding and removing fields on the draft being prepared. A new field belongs to the signer chosen
   under "Placing for"; it lands where a tool was dropped, or in the middle of the page on screen (a little lower and to the
   right each time, so new fields never hide each other). */
import { uid, qs, qsa } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { KINDS } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
