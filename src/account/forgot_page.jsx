/* account/forgot_page.jsx: #/forgot: ask for an email; FORMS.forgot (actions) shows "Check your email" in the
   message slot. ?email= fills the field. */
import { auth_shell, auth_links } from './auth_shell.jsx';

export function forgot_page(r) {
  return auth_shell('Forgot password', 'Enter your email. We will send you a link to set a new password.', <>
    <form data-form="forgot" className="on_bg mt-8 grid gap-6" noValidate><div data-msg-slot="" className="empty:hidden"></div>
      <div className="field"><label htmlFor="forgot_email">Email</label>
        <input id="forgot_email" name="email" type="email" autoComplete="email" required placeholder="you@lorem.io" defaultValue={r.q.email || ''} /></div>
      <button className="btn btn_primary mt-2 w-full">Send link</button></form>{auth_links('forgot')}
  </>);
}
