/* sign/prep_dialogs.jsx: the bodies of the prepare page's dialogs: a signer's note (edit it) and Send for signing (who
   gets it, how many fields each, the note each one reads). */
import { ic } from '../icons/index.js';
import { initials } from '../ui/index.js';

export const note_body = r => <div className="field sm:col-span-2"><label htmlFor="sign_note_in">Note for {r.name}</label>
  <textarea id="sign_note_in" name="note" rows={4} maxLength={500} placeholder=" " defaultValue={r.note || ''} /></div>;

export const send_body = d => <div className="grid gap-4 sm:col-span-2">
  <p className="text-sm text-muted">“{d.title}” · {d.pages.length} page{d.pages.length === 1 ? '' : 's'}</p>
  <ul className="grid gap-2">{d.recipients.map(r => { const n = d.fields.filter(f => f.rid === r.id).length;
