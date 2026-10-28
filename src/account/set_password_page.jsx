/* account/set_password_page.jsx: /set-password: new password with a strength meter and live rules (pw_check), then
   confirm. FORMS.setpw (actions) checks the rules and the match; fields are named pw_new and pw_confirm. */
import { ic } from '../icons/index.js';
import { auth_shell, auth_links, pw_field } from './auth_shell.jsx';
import { PW_RULES } from './pw_rules.js';

export function set_password_page() {
  return auth_shell('Set a new password', 'Choose a strong password that you do not use anywhere else.', <>
    <form data-form="setpw" className="on_bg mt-8 grid gap-6" noValidate><div data-msg-slot="" className="empty:hidden"></div>
      {pw_field('pw_new', 'New password', 'new-password', { 'data-pw': '' })}
      <div className="-mt-3 grid gap-1.5"><meter min="0" max="4" low="2" high="3" optimum="4" value="0" data-pw-meter="" aria-label="Password strength"></meter>
        <p className="text-xs text-muted" data-pw-label="">Type a password</p></div>
      <ul className="pw_rules -mt-2 grid gap-1.5 text-sm">{PW_RULES.map(([k, l]) => <li key={k} data-rule={k}>{ic('check', 'h-4 w-4 shrink-0')}{l}</li>)}</ul>
      {pw_field('pw_confirm', 'Confirm password', 'new-password')}
      <button className="btn btn_primary mt-2 w-full">Save password</button></form>{auth_links('set-password')}
  </>);
}
