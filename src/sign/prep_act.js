/* sign/prep_act.js: the prepare page's buttons (data-act): whose fields to place, add or remove a field, the signers'
   sheet on phones, a signer's note, remove a signer, Save, and Send for signing (checked first: every signer needs a field). */
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { go } from '../router/index.js';
import { rec_of, log, who } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
import { add_field, del_field } from './prep_fields.js';
import { note_body, send_body } from './prep_dialogs.jsx';

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function remove_rec(r) {
  P.doc.recipients = P.doc.recipients.filter(x => x.id !== r.id); P.doc.fields = P.doc.fields.filter(f => f.rid !== r.id);
  if (P.rid === r.id) P.rid = P.doc.recipients[0]?.id || null;
  P.sel = null; prep_dirty(); rerender();
}

function send() {
  const d = P.doc, now = Date.now();
  Object.assign(d, { status: 'sent', sent_at: now });
  d.recipients.forEach(r => { r.status = 'pending'; delete r.viewed_at; delete r.signed_at; });
  log(d, `${who().name} sent it to ${d.recipients.map(r => r.email).join(', ')}`); prep_save();
  notify(`${plural(d.recipients.length, 'signer')} can now sign it under To sign.`, 'ok', 'Document sent'); go(`/admin/sign/doc/${d.id}`);
}

export const PREP_ACT = {
  sign_rid: t => { P.rid = t.dataset.id; P.sheet = false; rerender(); },
  sign_tool: t => add_field(t.dataset.type),
  sign_field_del: t => del_field(t.dataset.id),
  sign_sheet: () => { P.sheet = !P.sheet; rerender(); },
  sign_rec_note: t => { const r = rec_of(P.doc, t.dataset.id);
    modal({ title: `Note for ${r.name}`, help: 'They read it before they sign. Leave it empty for no note.', body: note_body(r), submit: 'Save note',
