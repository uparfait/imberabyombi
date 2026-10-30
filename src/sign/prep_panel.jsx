/* sign/prep_panel.jsx: the prepare page's left column: the document's title and file,
   its signers (pick one to place their fields; Edit signer and Remove; a Note chip that opens their note and a chip when
   they must sign with a digital certificate; each card is tinted with the signer's colour, from their email) and the
   form that adds a
   signer: name, email and a note for them. People already in the system are suggested as you type a name. Once there is
   a signer the form folds into an "Add signer" button; Save adds the signer and folds it again, Cancel just folds it. */
import { ic } from '../icons/index.js';
import { db, rerender } from '../store/index.js';
import { validate, notify } from '../feedback/index.js';
import { initials } from '../ui/index.js';
import { add_rec, size_of } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
import { status_chip } from './sign_list.jsx';
import { chips, note_text } from './signer_bits.jsx';

const people = () => db.list('staff').filter(s => s.email && s.name);

function add(e) {
  e.preventDefault(); const f = e.currentTarget; if (!validate(f)) return;
  const v = Object.fromEntries(new FormData(f)), name = v.name.trim(), email = v.email.trim().toLowerCase();
  if (P.doc.recipients.some(r => r.email === email)) return notify(`${email} already signs this document.`, 'warn', 'Already a signer');
  const r = add_rec(P.doc, name, email, String(v.note || '').trim(), !!v.cert); P.rid = r.id; P.adding = false;
  f.reset(); prep_dirty(); rerender(); notify(`Now place ${name.split(' ')[0]}’s fields on the document.`, 'ok', 'Signer added');
}
const open_form = v => { P.adding = v; rerender(); if (v) requestAnimationFrame(() => document.getElementById('sign_r_name')?.focus()); };
/* a name picked from the suggestions brings its email */
const fill = e => { const p = people().find(s => s.name === e.target.value); if (p && !e.target.form.elements.email.value) e.target.form.elements.email.value = p.email; };

const rec = (d, r) => { const n = d.fields.filter(f => f.rid === r.id).length, on = P.rid === r.id;
