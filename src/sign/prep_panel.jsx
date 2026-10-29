/* sign/prep_panel.jsx: the prepare page's left column (a sheet that slides up on phones): the document's title and file,
   its signers (pick one to place their fields; each shows their note, with Edit note and Remove) and the form that adds a
   signer: name, email and a note for them. People already in the system are suggested as you type a name. */
import { ic } from '../icons/index.js';
import { db, rerender } from '../store/index.js';
import { validate, notify } from '../feedback/index.js';
import { initials } from '../ui/index.js';
import { add_rec, size_of } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
import { status_chip } from './sign_list.jsx';

const people = () => db.list('staff').filter(s => s.email && s.name);

function add(e) {
  e.preventDefault(); const f = e.currentTarget; if (!validate(f)) return;
  const v = Object.fromEntries(new FormData(f)), name = v.name.trim(), email = v.email.trim().toLowerCase();
  if (P.doc.recipients.some(r => r.email === email)) return notify(`${email} already signs this document.`, 'warn', 'Already a signer');
  const r = add_rec(P.doc, name, email, String(v.note || '').trim()); P.rid = r.id;
  f.reset(); prep_dirty(); rerender(); notify(`Now place ${name.split(' ')[0]}’s fields on the document.`, 'ok', 'Signer added');
}
/* a name picked from the suggestions brings its email */
const fill = e => { const p = people().find(s => s.name === e.target.value); if (p && !e.target.form.elements.email.value) e.target.form.elements.email.value = p.email; };

const rec = (d, r) => { const n = d.fields.filter(f => f.rid === r.id).length, on = P.rid === r.id;
  return <li key={r.id} className={`sign_rec ${on ? 'on' : ''}`} style={{ '--c': r.color }}>
    <button type="button" className="sign_rec_pick" data-act="sign_rid" data-id={r.id} aria-pressed={on}>
      <span className="sign_dot" style={{ background: r.color }}>{initials(r.name)}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{r.name}</span>
