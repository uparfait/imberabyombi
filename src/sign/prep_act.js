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

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function remove_rec(r) {
  P.doc.recipients = P.doc.recipients.filter(x => x.id !== r.id); P.doc.fields = P.doc.fields.filter(f => f.rid !== r.id);
  if (P.rid === r.id) P.rid = P.doc.recipients[0]?.id || null;
  P.sel = null; prep_dirty(); rerender();
}

function send() {
  const d = P.doc, now = Date.now();
  Object.assign(d, { status: 'sent', sent_at: now });
  d.recipients.forEach(r => { r.status = 'pending'; ['viewed_at', 'signed_at', 'cert_at', 'cert_file'].forEach(k => delete r[k]); });
  log(d, `${who().name} sent it to ${d.recipients.map(r => r.email).join(', ')}`, 'send', who().email); prep_save();
  notify(`${plural(d.recipients.length, 'signer')} can now sign it under To sign.`, 'ok', 'Document sent'); go(`/admin/sign/doc/${d.id}`);
}

export const PREP_ACT = {
  sign_rid: t => { P.rid = t.dataset.id; rerender(); },
  sign_tool: t => add_field(t.dataset.type),
  sign_field_del: t => del_field(t.dataset.id),
  /* a signer's name, email and note; a new email brings its own colour */
  sign_rec_edit: t => { const r = rec_of(P.doc, t.dataset.id);
