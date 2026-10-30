/* sign/prep_dialogs.jsx: the bodies of the prepare page's dialogs: a signer's details (edit their name, email and note)
   and Send for signing (who gets it, how many fields each, the note each one reads). */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';

export const rec_body = r => <>
  <div className="field sm:col-span-2"><label htmlFor="sign_rec_name">Full name</label>
    <input id="sign_rec_name" name="name" required maxLength={60} placeholder=" " autoComplete="off" defaultValue={r.name} /></div>
