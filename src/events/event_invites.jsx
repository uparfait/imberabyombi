/* events/event_invites.jsx: an event's Invitations card. Add email addresses (type or paste them, or upload a spreadsheet
   or text file: every address in it is found); they wait as chips until Send invites, which also takes what is still
   typed. The people invited are listed with the day they were invited, and can be removed. A cancelled or past event keeps
   its list but takes no new invites. INVITE_ACT: the card's buttons (merged into EV_ACT). */
import { qs, cap, fmt_stamp } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { notify, request } from '../feedback/index.js';
import { ask } from '../overlays/index.js';
import { to } from '../router/index.js';
import { find_emails, not_emails, emails_in_file, INVITE_FILES } from './invite_emails.js';

const HELP = 'Type or paste email addresses (press Enter after each one, or paste many at once), or upload a spreadsheet or text '
  + 'file (Excel, CSV): every email address in it is found. Check the list, then send the invites: each person gets the invitation email.';
const n_of = (n, one, many) => n === 1 ? `1 ${one}` : `${n} ${many}`;
/* the addresses waiting to be sent (one event at a time) and what the last addition found */
const wait = { id: '', list: [], note: '' };
function add(id, found, bad = [], file = '') {
  const e = db.find('events', id), had = new Set([...(e?.invites || []).map(i => i.e), ...wait.list]), fresh = found.filter(m => !had.has(m)), old = found.length - fresh.length;
  wait.list.push(...fresh);
  const said = [found.length ? `${n_of(fresh.length, 'address', 'addresses')} added` : '', old ? `${n_of(old, 'was', 'were')} already on the list` : '',
    bad.length ? `not an email address: ${bad.join(', ')}` : ''].filter(Boolean).join(', ');
  wait.note = !file ? cap(said) + '.' : found.length ? `Found ${n_of(found.length, 'address', 'addresses')} in ${file}: ${said}.` : `No email addresses were found in ${file}.`;
  rerender();
}
/* the typed text: its addresses join the list, anything else stays in the box to be corrected */
const take = (id, input) => { if (!input?.value.trim()) return; const v = input.value; input.value = not_emails(v).join(' '); add(id, find_emails(v), not_emails(v)); };
