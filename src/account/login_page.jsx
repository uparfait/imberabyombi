/* account/login_page.jsx: #/login: pick a role (or arrive with an invitation, ?role=), name, email and any password.
   FORMS.login (actions) signs in; ?name= and ?email= fill the fields, and the last role used is preselected. */
import { ic } from '../icons/index.js';
import { roles } from '../auth/index.js';
import { db } from '../store/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';

/* the invitation note, or the role picker */
const role_part = (inv, rs, sel) => inv ? <>
  <p className="flex items-center gap-2 rounded-xl bg-brand/10 p-3 text-sm text-accent">{ic('link', 'h-4 w-4 shrink-0')}
    <span>You were invited as <strong>{inv.name}</strong>.</span></p>
  <input type="hidden" name="role" defaultValue={inv.id} /></>
  : <div className="field"><label htmlFor="signin_role">Sign in as</label><select id="signin_role" name="role" required defaultValue={sel}>
    {rs.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>;

export function login_page(r) {
  const rs = roles(), inv = r.q.role && rs.find(x => x.id === r.q.role), sel = inv?.id || db.get('lastRole') || 'super';
  return auth_shell('Sign in', 'Use any details. Your data stays in this browser.', <>
    <form data-form="login" className="on_bg mt-8 grid gap-6" noValidate>
      <div data-msg-slot="" className="empty:hidden"></div>
      {role_part(inv, rs, sel)}
      <div className="field"><label htmlFor="signin_name">Full name</label>
        <input id="signin_name" name="name" autoComplete="name" defaultValue={r.q.name || ''} placeholder="Lorem Ipsum" /></div>
      <div className="field"><label htmlFor="signin_email">Email</label>
