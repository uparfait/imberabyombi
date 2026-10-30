/* sign/sign_store.js: O-Doc Sign's data. A document is a record in the 'sign_docs' collection: title, file name, page sizes,
   owner, status (draft · sent · completed), signers (name, email, a note for each, colour, signed or not) and the fields
   placed for them (signature or stamp, page, position as fractions of the page). The PDF and the marks drawn on it live in
   IndexedDB (sign_idb.js). Nothing is seeded: each person sees the documents they prepared and the ones sent to them. */
import { db } from '../store/index.js';
import { uid, seed_color } from '../lib/index.js';
import { auth } from '../auth/index.js';

export const C = 'sign_docs';
/* status → [label, chip classes] */
export const STATUS = { draft: ['Draft', 'bg-muted/15 text-muted'], sent: ['Waiting', 'bg-warn/15 text-warn'], completed: ['Completed', 'bg-ok/15 text-ok'] };
/* the lists in the O-Doc Sign menu: [key, label, icon, what it holds] */
export const LISTS = [
  ['all', 'All', 'layers', 'Every document you prepared, newest first.'], ['drafts', 'Drafts', 'edit', 'Documents you have not sent yet.'],
  ['waiting', 'Waiting', 'clock', 'Sent and waiting for signatures.'], ['completed', 'Completed', 'check', 'Signed by everyone.'],
  ['archived', 'Archived', 'archive', 'Documents you put away. A document someone signed cannot be deleted: it is archived, and can be restored.'],
  ['inbox', 'To sign', 'signature', 'Documents sent to you for your signature.']];
const OF = { drafts: 'draft', waiting: 'sent', completed: 'completed' };
/* the field kinds: [label, icon, size in points (w, h)] */
export const KINDS = { signature: ['Signature', 'signature', 180, 56], stamp: ['Stamp', 'stamp', 112, 112] };

export const who = () => ({ email: String(auth.user?.email || '').toLowerCase(), name: auth.user?.name || '' });
export const all_docs = () => db.list(C);
export const find_doc = id => id ? db.find(C, id) : null;
export const mine = () => all_docs().filter(d => d.owner === who().email);
export const my_rec = d => d?.recipients.find(r => r.email === who().email);
