/* sign/prep_dialogs.jsx: the bodies of the prepare page's dialogs: a signer's details (edit their name, email and note)
   and Send for signing (who gets it, how many fields each, the note each one reads). */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';

export const rec_body = r => <>
  <div className="field sm:col-span-2"><label htmlFor="sign_rec_name">Full name</label>
    <input id="sign_rec_name" name="name" required maxLength={60} placeholder=" " autoComplete="off" defaultValue={r.name} /></div>
  <div className="field sm:col-span-2"><label htmlFor="sign_rec_email">Email</label>
    <input id="sign_rec_email" name="email" type="email" required maxLength={120} placeholder=" " autoComplete="off" defaultValue={r.email} /></div>
  <div className="field sm:col-span-2"><label htmlFor="sign_note_in">Note for this signer (optional)</label>
    <textarea id="sign_note_in" name="note" rows={3} maxLength={500} placeholder=" " defaultValue={r.note || ''} /></div>
  <label className="sign_check sm:col-span-2"><input type="checkbox" name="cert" defaultChecked={!!r.cert} />Must sign with a digital certificate</label></>;
