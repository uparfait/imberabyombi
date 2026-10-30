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
export const to_sign = () => all_docs().filter(d => d.status !== 'draft' && my_rec(d));
export const my_turn = d => d.status === 'sent' && my_rec(d)?.status !== 'signed';
/* archived documents show only under Archived (the signers keep theirs under To sign) */
const kept = () => mine().filter(d => !d.archived);
export const of_list = k => (k === 'inbox' ? to_sign() : k === 'archived' ? mine().filter(d => d.archived) : k === 'all' ? kept()
  : kept().filter(d => d.status === OF[k])).sort((a, b) => b.updated - a.updated);
/* the number a list shows; "To sign" counts only what still waits for you */
export const count = k => k === 'inbox' ? to_sign().filter(my_turn).length : of_list(k).length;
export const signed_n = d => d.recipients.filter(r => r.status === 'signed').length;
/* a document someone has signed is kept: it can be archived, never deleted */
export const kept_for_good = d => signed_n(d) > 0;
export const rec_of = (d, id) => d.recipients.find(r => r.id === id);
/* what still stops a draft from being sent (the Send button's tooltip while it is disabled), or '' */
export const send_block = d => !d.recipients.length ? 'Add the people who sign this document first.'
  : !d.fields.length ? 'Place a signature or stamp field on the document first.'
  : (r => r ? `Place a field for ${r.name} first, or remove them.` : '')(d.recipients.find(r => !d.fields.some(f => f.rid === r.id)));

/* an activity entry: its sentence (the signing certificate prints it), what was done (upload, send, open, sign, done) and
   by whom (email), so the activity can be drawn (activity.jsx) */
export const log = (d, t, act = '', by = '') => { d.audit.push({ at: Date.now(), t, act, by }); };
export const save_doc = d => { d.updated = Date.now(); db.upsert(C, d); return d; };
export const drop_doc = id => db.remove(C, id);
export function new_doc(name, size, pages) {
  const me = who(), now = Date.now(), title = name.replace(/\.pdf$/i, '').trim().slice(0, 80) || 'Untitled document';
  const d = { id: uid(), title, file: name, size, pages, owner: me.email, owner_name: me.name, status: 'draft',
    recipients: [], fields: [], created: now, updated: now, audit: [] };
  log(d, `${me.name} uploaded ${name}`, 'upload', me.email); db.upsert(C, d); return d;
}
/* a signer's colour (their card, avatar, tag and fields) comes from their email (lib/seed_color.js), kept clear of the
   colours of the signers before them in this document */
export function add_rec(d, name, email, note, cert = false) {
  const r = { id: uid(), name, email, note, cert, color: seed_color(email, d.recipients.map(x => x.color)), status: 'pending' };
  d.recipients.push(r); return r;
}
/* colours again from the emails, in order (a draft opened, an email changed) */
export const recolor = d => d.recipients.reduce((used, r) => { r.color = seed_color(r.email, used); return [...used, r.color]; }, []);

/* "12 Mar 2026, 14:05", "5 min ago", "1.2 MB" */
export const when = t => t ? new Date(t).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '';
export const ago = t => { const s = (Date.now() - t) / 1e3;
  return s < 60 ? 'just now' : s < 3600 ? `${s / 60 | 0} min ago` : s < 86400 ? `${s / 3600 | 0} h ago` : new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); };
export const size_of = n => n < 1048576 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1048576).toFixed(1)} MB`;
