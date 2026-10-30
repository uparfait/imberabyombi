/* sign/signer_bits.jsx: small pieces of a signer's card, on the prepare page and the progress page: a Note chip (the note
   shows only while it is open, signer by signer) and the digital certificate chip (asked for · verified). chips(r, lead)
   is the row of chips (lead: a chip first, e.g. "Placing fields") and note_text(r) the open note under it; NOTE_ACT opens
   and closes a note. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { when } from './sign_store.js';

/* what "Force digital signature" asks of a signer (its help icon and the chip's tooltip) */
export const CERT_HELP = 'The signer must verify their identity with a digital certificate (the certificate file and its password) before they '
  + 'can sign or stamp.';
const OPEN = new Set();
export const NOTE_ACT = { sign_note_t: t => { const k = t.dataset.id; OPEN.has(k) ? OPEN.delete(k) : OPEN.add(k); rerender(); } };
