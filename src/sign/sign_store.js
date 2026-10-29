/* sign/sign_store.js: O-Doc Sign's data. A document is a record in the 'sign_docs' collection: title, file name, page sizes,
   owner, status (draft · sent · completed), signers (name, email, a note for each, colour, signed or not) and the fields
   placed for them (signature or stamp, page, position as fractions of the page). The PDF and the marks drawn on it live in
   IndexedDB (sign_idb.js). Nothing is seeded: each person sees the documents they prepared and the ones sent to them. */
import { db } from '../store/index.js';
import { uid } from '../lib/index.js';
import { auth } from '../auth/index.js';

export const C = 'sign_docs';
/* one colour per signer, in order (their fields, avatar and tag) */
export const COLORS = ['#E0661B', '#2F6FDB', '#12936B', '#8B4FD8', '#D6407A', '#0E8FA6'];
/* status → [label, chip classes] */
export const STATUS = { draft: ['Draft', 'bg-muted/15 text-muted'], sent: ['Waiting', 'bg-warn/15 text-warn'], completed: ['Completed', 'bg-ok/15 text-ok'] };
/* the lists in the O-Doc Sign menu: [key, label, icon, what it holds] */
export const LISTS = [
  ['all', 'All', 'layers', 'Every document you prepared, newest first.'], ['drafts', 'Drafts', 'edit', 'Documents you have not sent yet.'],
  ['waiting', 'Waiting', 'clock', 'Sent and waiting for signatures.'], ['completed', 'Completed', 'check', 'Signed by everyone.'],
  ['inbox', 'To sign', 'signature', 'Documents sent to you for your signature.']];
const OF = { drafts: 'draft', waiting: 'sent', completed: 'completed' };
/* the field kinds: [label, icon, size in points (w, h)] */
export const KINDS = { signature: ['Signature', 'signature', 180, 56], stamp: ['Stamp', 'stamp', 112, 112] };

export const who = () => ({ email: String(auth.user?.email || '').toLowerCase(), name: auth.user?.name || '' });
export const all_docs = () => db.list(C);
export const find_doc = id => id ? db.find(C, id) : null;
export const mine = () => all_docs().filter(d => d.owner === who().email);
export const my_rec = d => d?.recipients.find(r => r.email === who().email);
export const to_sign = () => all_docs().filter(d => d.status !== 'draft' && my_rec(d));
export const my_turn = d => d.status === 'sent' && my_rec(d)?.status !== 'signed';
export const of_list = k => (k === 'inbox' ? to_sign() : k === 'all' ? mine() : mine().filter(d => d.status === OF[k]))
  .sort((a, b) => b.updated - a.updated);
/* the number a list shows; "To sign" counts only what still waits for you */
export const count = k => k === 'inbox' ? to_sign().filter(my_turn).length : of_list(k).length;
