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
