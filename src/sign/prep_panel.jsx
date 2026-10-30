/* sign/prep_panel.jsx: the prepare page's left column: the document's title and file,
   its signers (each card: Edit and Remove, then a short list: Adding fields, Digital signature, Editing, Notes, signer_bits.jsx;
   tinted with the signer's colour, from their email) and the form that adds a
   signer: name, email and a note for them. People already in the system are suggested as you type a name. Once there is
   a signer the form folds into an "Add signer" button; Save adds the signer and folds it again, Cancel just folds it. */
import { ic } from '../icons/index.js';
import { db, rerender } from '../store/index.js';
import { validate, notify } from '../feedback/index.js';
import { initials, help_tip } from '../ui/index.js';
import { add_rec, size_of } from './sign_store.js';
import { P, prep_dirty } from './prep_state.js';
import { status_chip } from './sign_list.jsx';
import { chips, note_text, CERT_HELP } from './signer_bits.jsx';

const people = () => db.list('staff').filter(s => s.email && s.name);

function add(e) {
  e.preventDefault(); const f = e.currentTarget; if (!validate(f)) return;
  const v = Object.fromEntries(new FormData(f)), name = v.name.trim(), email = v.email.trim().toLowerCase();
  if (P.doc.recipients.some(r => r.email === email)) return notify(`${email} already signs this document.`, 'warn', 'Already a signer');
  const r = add_rec(P.doc, name, email, String(v.note || '').trim(), !!v.cert); P.rid = r.id; P.adding = false;
  f.reset(); gate(f); prep_dirty(); rerender(); notify(`Now place ${name.split(' ')[0]}’s fields on the document.`, 'ok', 'Signer added');
}
/* Save signer is enabled only when the form can be saved: a name, a valid email, and that email not a signer yet */
const gate = f => { if (!f) return; const email = f.elements.email.value.trim().toLowerCase();
  f.querySelector('button.btn_primary').disabled = !f.checkValidity() || P.doc.recipients.some(r => r.email === email); };
const open_form = v => { P.adding = v; rerender(); if (v) requestAnimationFrame(() => document.getElementById('sign_r_name')?.focus()); };
/* a name picked from the suggestions brings its email */
const fill = e => { const p = people().find(s => s.name === e.target.value); if (p && !e.target.form.elements.email.value) e.target.form.elements.email.value = p.email; gate(e.target.form); };

const rec = (d, r) => { const n = d.fields.filter(f => f.rid === r.id).length, on = P.rid === r.id;
  return <li key={r.id} className={`sign_rec ${on ? 'on' : ''}`} style={{ '--c': r.color }}>
    <div className="flex items-center gap-0.5">
      <button type="button" className="sign_rec_pick min-w-0 flex-1" data-act="sign_rid" data-id={r.id} aria-pressed={on}>
        <span className="sign_dot" style={{ background: r.color }}>{initials(r.name)}</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{r.name}</span>
          <span className="block truncate text-xs text-muted">{r.email} · {n} field{n === 1 ? '' : 's'}</span></span></button>
      <button type="button" className="icon_btn h-8 w-8" data-act="sign_rec_edit" data-id={r.id} data-tip="Edit signer" aria-label={`Edit ${r.name}`}>{ic('edit', 'h-4 w-4')}</button>
      <button type="button" className="icon_btn h-8 w-8 hover:text-bad" data-act="sign_rec_del" data-id={r.id} data-tip="Remove" aria-label={`Remove ${r.name}`}>{ic('trash', 'h-4 w-4')}</button></div>
    {chips(r, on ? <span className="sign_chip sign_chip_on">{ic('signature', 'h-3.5 w-3.5')}Placing fields</span> : null)}{note_text(r)}</li>; };

export const prep_panel = d => <div className="sign_panel">
  <section aria-label="Document">
    <div className="flex items-center gap-2">{status_chip(d)}<span className="chip bg-warn/15 text-warn" data-unsaved="" hidden={!P.dirty}>Unsaved</span></div>
    <input key={d.id} className="sign_title" defaultValue={d.title} maxLength={80} aria-label="Document title" onInput={e => { d.title = e.target.value; prep_dirty(); }} />
    <p className="mt-1 truncate text-xs text-muted" title={d.file}>{d.file} · {d.pages.length} page{d.pages.length === 1 ? '' : 's'} · {size_of(d.size)}</p></section>
  <section aria-label="Signers"><h2 className="sign_cap">Signers</h2>
    {d.recipients.length ? <ul className="grid gap-2">{d.recipients.map(r => rec(d, r))}</ul>
      : <p className="sign_hint">No signers yet. Add the people who sign this document.</p>}
    {d.recipients.length && !P.adding
      ? <button type="button" className="btn btn_outline btn_sm mt-4 w-full" onClick={() => open_form(true)}>{ic('plus', 'h-4 w-4')}Add signer</button>
      : <form className="mt-4 grid gap-3" noValidate onSubmit={add} onInput={e => gate(e.currentTarget)} ref={gate} aria-label="Add a signer">
      <div className="field"><label htmlFor="sign_r_name">Full name</label>
        <input id="sign_r_name" name="name" required maxLength={60} placeholder=" " autoComplete="off" list="sign_people" onInput={fill} /></div>
      <datalist id="sign_people">{people().map(p => <option key={p.id} value={p.name}>{p.email}</option>)}</datalist>
      <div className="field"><label htmlFor="sign_r_email">Email</label>
        <input id="sign_r_email" name="email" type="email" required maxLength={120} placeholder=" " autoComplete="off" /></div>
      <div className="field"><label htmlFor="sign_r_note">Note for this signer (optional)</label>
        <textarea id="sign_r_note" name="note" rows={2} maxLength={500} placeholder=" " /></div>
      <div className="sign_check_row"><label className="sign_check"><input type="checkbox" name="cert" />Force digital signature</label>
        {help_tip(CERT_HELP, 'Force digital signature')}</div>
      <div className="flex gap-2">{d.recipients.length ? <button type="button" className="btn btn_ghost btn_sm flex-1" onClick={() => open_form(false)}>Cancel</button> : null}
        <button className="btn btn_primary btn_sm flex-1">{ic('check', 'h-4 w-4')}Save signer</button></div></form>}</section>
</div>;
