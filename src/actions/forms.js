/* actions/forms.js: FORMS, the submit handler of every form with data-form, FORMS[k](values, form): values = form_obj(form).
   Sign-in, contact, newsletter, side-panel note, profile, forgot password, one-time code, set password. Return false to
   keep the form as it is (an error is shown). */
import { qs, qsa, esc, uid } from '../lib/index.js';
import { db, route, rerender } from '../store/index.js';
import { auth, role_name, landing } from '../auth/index.js';
import { notify_next, form_msg, show_err } from '../feedback/index.js';
import { refresh_panel, ensure_mine } from '../admin/index.js';
import { PW_RULES } from '../account/index.js';

export const FORMS = {
  login: d => { const email = d.email.trim().toLowerCase(), name = (d.name || '').trim() || email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), role = d.role || 'super';
    if (!db.list('staff').some(s => s.email === email)) db.upsert('staff', { name, email, role, phone: '', status: 'Active' });
    auth.login({ name, email, role, remember: !!d.remember, at: Date.now() }); db.set('lastRole', role); ensure_mine(name);
    notify_next(`You are signed in as ${role_name(role)}.`, 'ok', `Welcome, ${name.split(' ')[0]}`); location.hash = route.q.next || landing(role); },
  contact: (d, f) => { db.set('messages', [...db.get('messages', []), { ...d, at: Date.now() }]); f.reset(); form_msg(f, 'ok', 'Message sent', 'We reply within two working days.'); },
  news: (d, f) => { f.reset(); form_msg(f, 'ok', 'You are subscribed', 'Check your inbox to confirm.'); },
  note: d => { db.set('notes', [{ id: uid(), title: d.title, body: d.body, at: Date.now() }, ...db.get('notes', [])]); refresh_panel(); qs('#side_panel article')?.classList.add('row_flash'); },
  profile: d => { const u = auth.user; auth.login({ ...u, name: d.name.trim(), email: d.email.trim().toLowerCase() }); rerender(); form_msg(qs('[data-form=profile]'), 'ok', 'Profile saved', 'Your new name and email show everywhere.'); },
  /* the message text is HTML (the slot is filled by plain JS): the address is escaped */
  forgot: (d, f) => form_msg(f, 'ok', 'Check your email', `We sent a reset link to <b>${esc(d.email)}</b>. It expires in 30 minutes.`, false),
  otp: (d, f) => { const code = qsa('.otp_box', f).map(i => i.value).join('');
    if (!/^\d{6}$/.test(code)) { form_msg(f, 'bad', 'Enter the 6-digit code', 'Type or paste all six digits.', false); qsa('.otp_box', f).find(i => !i.value)?.focus(); return false; }
    if (d.setup) notify_next('Use it to get a code each time you sign in.', 'ok', 'Authenticator app is on');
