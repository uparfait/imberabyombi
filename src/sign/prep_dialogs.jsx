/* sign/prep_dialogs.jsx: the bodies of the prepare page's dialogs: a signer's details (edit their name, email and note)
   and Send for signing (who gets it, how many fields each, the note each one reads). */
import { ic } from '../icons/index.js';
import { initials, help_tip } from '../ui/index.js';
import { CERT_HELP } from './signer_bits.jsx';

export const rec_body = r => <>
  <div className="field sm:col-span-2"><label htmlFor="sign_rec_name">Full name</label>
    <input id="sign_rec_name" name="name" required maxLength={60} placeholder=" " autoComplete="off" defaultValue={r.name} /></div>
  <div className="field sm:col-span-2"><label htmlFor="sign_rec_email">Email</label>
    <input id="sign_rec_email" name="email" type="email" required maxLength={120} placeholder=" " autoComplete="off" defaultValue={r.email} /></div>
  <div className="field sm:col-span-2"><label htmlFor="sign_note_in">Note for this signer (optional)</label>
    <textarea id="sign_note_in" name="note" rows={3} maxLength={500} placeholder=" " defaultValue={r.note || ''} /></div>
  <label className="sign_check sm:col-span-2"><input type="checkbox" name="cert" defaultChecked={!!r.cert} />Must sign with a digital certificate</label></>;

export const send_body = d => <div className="grid gap-4 sm:col-span-2">
  <p className="text-sm text-muted">“{d.title}” · {d.pages.length} page{d.pages.length === 1 ? '' : 's'}</p>
  <ul className="grid gap-2">{d.recipients.map(r => { const n = d.fields.filter(f => f.rid === r.id).length;
    return <li key={r.id} className="sign_send_row" style={{ '--c': r.color }}>
      <span className="sign_dot" style={{ background: r.color }}>{initials(r.name)}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{r.name}</span>
        <span className="block truncate text-xs text-muted">{r.email} · {n} field{n === 1 ? '' : 's'}{r.cert ? ' · digital certificate' : ''}</span>
        {r.note ? <span className="sign_note mt-1">“{r.note}”</span> : null}</span>
      {ic('send', 'h-4 w-4 shrink-0 text-muted')}</li>; })}</ul>
</div>;
