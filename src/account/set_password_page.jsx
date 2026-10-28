/* account/set_password_page.jsx: #/set-password: new password with a strength meter and live rules (pw_check), then
   confirm. FORMS.setpw (actions) checks the rules and the match; fields are named pw_new and pw_confirm. */
import { ic } from '../icons/index.js';
import { auth_shell, auth_links, pw_field } from './auth_shell.jsx';
import { PW_RULES } from './pw_rules.js';

export function set_password_page() {
