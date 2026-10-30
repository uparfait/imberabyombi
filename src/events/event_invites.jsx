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
const upload = (id, input) => { const file = input.files[0]; input.value = ''; if (!file) return;
  request(async () => { try { add(id, await emails_in_file(file), [], file.name); }
    catch { notify(`${file.name} could not be read. Save it as .xlsx or .csv and try again.`, 'bad', 'File not read'); } }, { btn: input.closest('label') }); };

export const INVITE_ACT = {
  ev_unwait: t => { wait.list = wait.list.filter(m => m !== t.dataset.e); rerender(); },
  ev_invite: t => { take(t.dataset.id, qs('#ev_inv_in')); const e = db.find('events', t.dataset.id), n = wait.list.length;
    if (!e || !n) { wait.note = 'Add at least one email address first.'; return rerender(); }
    db.upsert('events', { id: e.id, invites: [...(e.invites || []), ...wait.list.map(m => ({ e: m, at: Date.now() }))] });
    const left = not_emails(qs('#ev_inv_in')?.value || '');   /* still in the box: not addresses */
    Object.assign(wait, { list: [], note: left.length ? `Not an email address: ${left.join(', ')}.` : '' });
    rerender(); notify(`${n_of(n, 'person was', 'people were')} invited by email.`, 'ok', 'Invites sent'); },
  ev_uninvite: t => ask(`Remove ${t.dataset.e} from the invitations? They will not get any more emails about this event.`, () => {
    const e = db.find('events', t.dataset.id); db.upsert('events', { id: e.id, invites: (e.invites || []).filter(i => i.e !== t.dataset.e) }); rerender();
    notify('They are no longer on the list.', 'ok', 'Invitation removed'); }, 'Remove', true)
};

export function invites_card(e, st, can) {
  if (wait.id !== e.id) Object.assign(wait, { id: e.id, list: [], note: '' });
  const inv = e.invites || [], open = can && !['Cancelled', 'Past'].includes(st), n = wait.list.length;
  const keys = ev => { if (['Enter', ',', ';'].includes(ev.key)) { ev.preventDefault(); take(e.id, ev.currentTarget); } };
  return <section className="card ev_card" aria-labelledby="ev_sec_inv">
