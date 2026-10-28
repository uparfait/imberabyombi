/* account/set_password_page.jsx: #/set-password: new password with a strength meter and live rules (pw_check), then
   confirm. FORMS.setpw (actions) checks the rules and the match; fields are named pw_new and pw_confirm. */
import { ic } from '../icons/index.js';
import { auth_shell, auth_links, pw_field } from './auth_shell.jsx';
import { PW_RULES } from './pw_rules.js';

export function set_password_page() {
  return auth_shell('Set a new password', 'Choose a strong password that you do not use anywhere else.', <>
    <form data-form="setpw" className="on_bg mt-8 grid gap-6" noValidate><div data-msg-slot="" className="empty:hidden"></div>
      {pw_field('pw_new', 'New password', 'new-password', { 'data-pw': '' })}
