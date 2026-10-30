/* sign/prep_act.js: the prepare page's buttons (data-act): whose fields to place, add or remove a field, edit or remove a
   signer, Save, and Send for signing (checked first: every signer needs a field). */
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { go } from '../router/index.js';
import { rec_of, log, who, recolor } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
import { add_field, del_field } from './prep_fields.js';
import { rec_body, send_body } from './prep_dialogs.jsx';
import { add_signer } from './prep_panel.jsx';

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function remove_rec(r) {
  P.doc.recipients = P.doc.recipients.filter(x => x.id !== r.id); P.doc.fields = P.doc.fields.filter(f => f.rid !== r.id);
  if (P.rid === r.id) P.rid = P.doc.recipients[0]?.id || null;
  P.sel = null; prep_dirty(); rerender();
}

/* sent to the signers who have not signed (you may have signed your own fields already); signed by everyone: complete */
function send() {
  const d = P.doc, now = Date.now(), wait = d.recipients.filter(r => r.status !== 'signed');
  Object.assign(d, { status: 'sent', sent_at: now });
  wait.forEach(r => { r.status = 'pending'; ['viewed_at', 'signed_at', 'cert_at', 'cert_file'].forEach(k => delete r[k]); });
  if (wait.length) log(d, `${who().name} sent it to ${wait.map(r => r.email).join(', ')}`, 'send', who().email);
  else { Object.assign(d, { status: 'completed', completed_at: now }); log(d, 'Everyone signed: the document is complete', 'done'); }
  prep_save(); notify(wait.length ? `${plural(wait.length, 'signer')} can now sign it under To sign.` : 'It is under Completed, ready to download.',
}

export const PREP_ACT = {
  sign_rid: t => { P.rid = t.dataset.id; rerender(); },
  sign_tool: t => add_field(t.dataset.type),
  sign_field_del: t => del_field(t.dataset.id),
  /* Force digital signature, on or off, from the signer's card */
  sign_rec_cert: t => { const r = rec_of(P.doc, t.dataset.id); r.cert = !r.cert; prep_dirty(); rerender(); },
  /* a signer's name, email and note; a new email brings its own colour */
  sign_rec_edit: t => { const r = rec_of(P.doc, t.dataset.id);
    modal({ title: 'Edit signer', help: 'They find the document under To sign with this email, and read the note before they sign.',
      body: rec_body(r), submit: 'Save', on_submit: v => {
        const email = String(v.email).trim().toLowerCase();
        if (P.doc.recipients.some(x => x !== r && x.email === email)) { notify(`${email} already signs this document.`, 'warn', 'Already a signer'); return false; }
        const moved = email !== r.email; Object.assign(r, { name: String(v.name).trim(), email, note: String(v.note || '').trim(), cert: !!v.cert });
        if (moved) recolor(P.doc);
        prep_dirty(); rerender(); } }); },
  /* removing a signer always asks first */
  sign_rec_del: t => { const r = rec_of(P.doc, t.dataset.id), n = P.doc.fields.filter(f => f.rid === r.id).length;
    ask(`Remove ${r.name}? ${n ? `Their ${plural(n, 'field')} on the document go too.` : 'They will not get this document to sign.'}`, () => remove_rec(r), 'Remove', true); },
  /* Save draft keeps the draft as it is now: a signer still typed in the form is added first (a half-filled form stops the
     save and says what is missing), and the signer whose fields you are placing is remembered */
  sign_save: () => { const f = document.querySelector('form[aria-label="Add a signer"]');
    const typed = f && ['name', 'email', 'note'].some(k => f.elements[k]?.value.trim());
    if (typed && !add_signer(f, true)) return notify('Finish the signer you are adding, or clear the form, then save.', 'warn', 'Not saved yet');
    prep_save(); notify(typed ? 'Your changes are kept, the new signer too. Send it when it is ready.' : 'Your changes are kept. Send it when it is ready.', 'ok', 'Draft saved'); },
  sign_send: () => {
    const d = P.doc, R = d.recipients, alone = R.find(r => !d.fields.some(f => f.rid === r.id));
    /* what still stops it from being sent, in a dialog (a passing message was easy to miss) */
    const stop = (title, help, submit, then = () => {}) => modal({ title, help, submit, on_submit: then });
    if (!R.length) return stop('No signers yet', 'Add the people who sign this document, then send it.', 'Add a signer', () => { P.adding = true; rerender(); });
    if (!d.fields.length) return stop('No fields yet', 'Place at least one signature or stamp field on the document, then send it.', 'Place a field');
    if (alone) { P.rid = alone.id; rerender();
      return stop(`${alone.name} has no field yet`, 'Every signer needs a signature or stamp field. Place one for them (they are picked under Placing for), or remove them, then send it.',
        `Place ${alone.name.split(' ')[0]}’s field`); }
    if (!d.title.trim()) d.title = d.file.replace(/\.pdf$/i, '');
    modal({ title: 'Send for signing', help: 'Each signer finds it under To sign once they sign in with their email.', body: send_body(d), submit: 'Send', on_submit: send });
  }
};
