/* events/event_invites.jsx: an event's Invitations card. Add email addresses (type or paste them, or upload a spreadsheet
   or text file: every address in it is found); they wait as chips until Send invites, which also takes what is still
   typed. A waiting address can be changed on its chip (click it or its pen) or taken off (×). The people invited are in
   a table under it (invite_table.jsx), where they can be removed. A cancelled or past event keeps its list but takes no
   new invites. INVITE_ACT: the card's buttons (merged into EV_ACT). */
import { qs, cap } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
import { notify, request } from '../feedback/index.js';
import { to } from '../router/index.js';
import { find_emails, not_emails, emails_in_file, INVITE_FILES } from './invite_emails.js';
import { invite_table, INVITE_TABLE_ACT } from './invite_table.jsx';

const HELP = 'Type or paste email addresses (press Enter after each one, or paste many at once), or upload a spreadsheet or text '
  + 'file (Excel, CSV): every email address in it is found. Check the list, then send the invites: each person gets the invitation email.';
const n_of = (n, one, many) => n === 1 ? `1 ${one}` : `${n} ${many}`;
/* the addresses waiting to be sent (one event at a time), what the last addition found, the one being changed */
const wait = { id: '', list: [], note: '', edit: '' };
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
/* a waiting address changed on its chip: Enter or leaving it keeps the new one (if it is an address, not on the list yet),
   Esc or an empty box keeps the old one */
function chip_save(id, old, input) {
  if (wait.edit !== old) return; const v = input.value.trim().toLowerCase(), e = db.find('events', id);
  if (v && v !== old) {
    if (find_emails(v)[0] !== v) { wait.note = `Not an email address: ${v}.`; return rerender(); }
    if (wait.list.includes(v) || e?.invites?.some(i => i.e === v)) { wait.note = `${v} is already on the list.`; return rerender(); }
    wait.list = wait.list.map(m => m === old ? v : m); wait.note = '';
  }
  wait.edit = ''; rerender();
}
const chip_keys = (id, m) => k => { if (k.key === 'Enter') { k.preventDefault(); chip_save(id, m, k.currentTarget); }
  if (k.key === 'Escape') { k.stopPropagation(); Object.assign(wait, { edit: '', note: '' }); rerender(); } };
const upload = (id, input) => { const file = input.files[0]; input.value = ''; if (!file) return;
  request(async () => { try { add(id, await emails_in_file(file), [], file.name); }
    catch { notify(`${file.name} could not be read. Save it as .xlsx or .csv and try again.`, 'bad', 'File not read'); } }, { btn: input.closest('label') }); };

export const INVITE_ACT = {
  ...INVITE_TABLE_ACT,
  ev_unwait: t => { wait.list = wait.list.filter(m => m !== t.dataset.e); rerender(); },
  ev_wait_edit: t => { wait.edit = t.dataset.e; rerender(); },
  ev_invite: t => { take(t.dataset.id, qs('#ev_inv_in')); const e = db.find('events', t.dataset.id), n = wait.list.length;
    if (!e || !n) { wait.note = 'Add at least one email address first.'; return rerender(); }
    db.upsert('events', { id: e.id, invites: [...(e.invites || []), ...wait.list.map(m => ({ e: m, at: Date.now() }))] });
    const left = not_emails(qs('#ev_inv_in')?.value || '');   /* still in the box: not addresses */
    Object.assign(wait, { list: [], note: left.length ? `Not an email address: ${left.join(', ')}.` : '' });
    rerender(); notify(`${n_of(n, 'person was', 'people were')} invited by email.`, 'ok', 'Invites sent'); }
};

export function invites_card(e, st, can) {
  if (wait.id !== e.id) Object.assign(wait, { id: e.id, list: [], note: '', edit: '' });
  const inv = e.invites || [], open = can && !['Cancelled', 'Past'].includes(st), n = wait.list.length;
  const keys = ev => { if (['Enter', ',', ';'].includes(ev.key)) { ev.preventDefault(); take(e.id, ev.currentTarget); } };
  return <section className="card ev_card" aria-labelledby="ev_sec_inv">
    <header className="ev_card_head"><div className="flex items-center gap-1"><h3 id="ev_sec_inv">Invitations</h3>{help_tip(HELP, 'invitations')}</div>
      {auth.can('emails') ? <a href={to('/admin/emails?t=invite')} className="ev_link text-sm">See the email</a> : null}</header>
    {open ? <div className="ev_inv_add">
      <div className="ev_inv_row"><div className="field min-w-0 flex-1"><label htmlFor="ev_inv_in">Email addresses</label>
        <input id="ev_inv_in" type="text" inputMode="email" autoComplete="off" placeholder=" " onKeyDown={keys}
          onPaste={ev => { const t = ev.currentTarget; setTimeout(() => take(e.id, t)); }} onBlur={ev => take(e.id, ev.currentTarget)} /></div>
        <label className="btn btn_outline ev_upload">{ic('upload', 'h-4 w-4')}Upload a file
          <input type="file" accept={INVITE_FILES} className="sr-only" onChange={ev => upload(e.id, ev.currentTarget)} /></label></div>
      {wait.note ? <p className="ev_inv_note" role="status">{wait.note}</p> : null}
      {n ? <div className="ev_chips">{wait.list.map(m => wait.edit === m
        ? <span key={m} className="ev_chip ev_chip_edit"><input className="ev_chip_input" type="email" defaultValue={m} size={m.length + 3}
            aria-label={`Change ${m}`} autoFocus onKeyDown={chip_keys(e.id, m)} onBlur={k => chip_save(e.id, m, k.currentTarget)} /></span>
        : <span key={m} className="ev_chip"><button type="button" className="ev_chip_text" data-act="ev_wait_edit" data-e={m} data-tip="Change this address">{m}</button>
          <button type="button" className="ev_chip_x" data-act="ev_wait_edit" data-e={m} aria-label={`Change ${m}`}>{ic('edit', 'h-3 w-3')}</button>
      <button type="button" className="btn btn_primary btn_sm justify-self-start" data-act="ev_invite" data-id={e.id}>{ic('send', 'h-4 w-4')}{n ? `Send ${n_of(n, 'invite', 'invites')}` : 'Send invites'}</button>
    </div> : null}
    {inv.length ? invite_table(e, open) : <p className="text-sm text-muted">No one is invited yet.</p>}
  </section>;
}
