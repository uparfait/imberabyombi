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

const note_chip = r => <button type="button" className="sign_chip" data-act="sign_note_t" data-id={r.id} aria-expanded={OPEN.has(r.id)}
  aria-label={`${OPEN.has(r.id) ? 'Hide' : 'Show'} the note for ${r.name}`}>{ic('note', 'h-3.5 w-3.5')}Note{ic('chev_d', 'sign_chev h-3.5 w-3.5')}</button>;
const cert_chip = r => <span className={`sign_chip ${r.cert_at ? 'ok' : ''}`} data-tip={r.cert_at
  ? `${r.cert_file} · verified ${when(r.cert_at)}` : CERT_HELP}>
  {ic('shield', 'h-3.5 w-3.5')}{r.cert_at ? 'Digital signature verified' : 'Digital signature'}</span>;

export const chips = (r, lead = null) => lead || r.note || r.cert
  ? <div className="sign_chips">{lead}{r.note ? note_chip(r) : null}{r.cert ? cert_chip(r) : null}</div> : null;
