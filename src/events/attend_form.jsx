/* events/attend_form.jsx: <Attend_form/>, signing in to an event or activity: full name, email, telephone, organisation
   or unit, position and a signature, drawn (the O-Doc Sign pad) or digital (name, email and time, signed with a
   certificate id). Saved to attendees, once per email; then a large tick. demo: the design system's copy (saves nothing). */
import { useState } from 'react';
import { hash_str } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { field_spec } from '../schemas/fields.js';
import { field } from '../fields/index.js';
import { validate } from '../feedback/index.js';
import { Pad_draw } from '../sign/pad_draw.jsx';
import { PAD } from '../sign/pad_state.js';

const F = [field_spec('name', 'Full name', 'text', 0, 1), field_spec('email', 'Email', 'email', 0, 1), field_spec('tel', 'Telephone', 'tel'),
  field_spec('org', 'Organisation or unit'), field_spec('position', 'Position')];
const MODES = [['Drawn', 'Draw'], ['Digital', 'Digital']];

export const Tick = ({ text, sub }) => <div className="att_done" role="status">
  <svg className="att_tick" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
  <p className="att_done_t">{text}</p>{sub ? <p className="text-muted">{sub}</p> : null}</div>;

export function Attend_form({ c, id, demo }) {
  const [mode, set_mode] = useState('Drawn'), [done, set_done] = useState(null), [err, set_err] = useState('');
  if (done) return <Tick text="Attendance submitted" sub={done} />;
  const submit = async e => {
    e.preventDefault(); const f = e.currentTarget; if (!validate(f)) return;
    const d = Object.fromEntries(new FormData(f)), email = d.email.trim().toLowerCase(), name = d.name.trim(), at = new Date().toISOString();
    const sig = mode === 'Drawn' ? await PAD.get() : `${name} · ${email} · ${at} · ${hash_str(email + at).toString(16).toUpperCase()}`;
    if (!sig) return set_err('Sign in the box.');
    if (!demo && !db.list('attendees').some(a => a.ref === id && a.email === email))
      db.upsert('attendees', { ref: id, c, name, email, tel: d.tel.trim(), org: d.org.trim(), position: d.position.trim(), sig_kind: mode, sig, at });
    set_done(name);
