/* sign/signer_bits.jsx: small pieces of a signer's card, on the prepare page and the progress page: a Note chip (the note
   shows only while it is open, signer by signer) and the digital certificate chip (asked for · verified). chips(r, lead)
   is the row of chips (lead: a chip first, e.g. "Placing fields") and note_text(r) the open note under it; NOTE_ACT opens
   and closes a note. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { when } from './sign_store.js';

/* what "Force digital signature" asks of a signer (its help icon and the chip's tooltip) */
