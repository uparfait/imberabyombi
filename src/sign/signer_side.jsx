/* sign/signer_side.jsx: the signing page's guide (beside the document on large screens, above it on phones): who asks and
   as whom you sign, the sender's note for you, your progress with Next field and Finish (a bar at the bottom on phones),
   and the agreement shown before you sign. */
import { ic, i3 } from '../icons/index.js';
import { KINDS } from './sign_store.js';
import { own_fields, left_of } from './signer_state.js';

const next_text = left => left.length
  ? `${left.length} field${left.length > 1 ? 's' : ''} left · next: ${KINDS[left[0].type][0].toLowerCase()}` : 'All your fields are filled';
