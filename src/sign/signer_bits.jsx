/* sign/signer_bits.jsx: small pieces of a signer's card, on the prepare page and the progress page: a Note chip (the note
   shows only while it is open, signer by signer) and the digital certificate chip (asked for · verified). chips(r) is the
   row of chips and note_text(r) the open note under it; NOTE_ACT opens and closes a note. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { when } from './sign_store.js';

const OPEN = new Set();
export const NOTE_ACT = { sign_note_t: t => { const k = t.dataset.id; OPEN.has(k) ? OPEN.delete(k) : OPEN.add(k); rerender(); } };

const note_chip = r => <button type="button" className="sign_chip" data-act="sign_note_t" data-id={r.id} aria-expanded={OPEN.has(r.id)}
  aria-label={`${OPEN.has(r.id) ? 'Hide' : 'Show'} the note for ${r.name}`}>{ic('note', 'h-3.5 w-3.5')}Note{ic('chev_d', 'sign_chev h-3.5 w-3.5')}</button>;
const cert_chip = r => <span className={`sign_chip ${r.cert_at ? 'ok' : ''}`} data-tip={r.cert_at
  ? `${r.cert_file} · verified ${when(r.cert_at)}` : 'They sign with their digital certificate and its password'}>
  {ic('shield', 'h-3.5 w-3.5')}{r.cert_at ? 'Certificate verified' : 'Certificate'}</span>;
