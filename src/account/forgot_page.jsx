/* account/forgot_page.jsx: #/forgot: ask for an email; FORMS.forgot (actions) shows "Check your email" in the
   message slot. ?email= fills the field. */
import { auth_shell, auth_links } from './auth_shell.jsx';

export function forgot_page(r) {
  return auth_shell('Forgot password', 'Enter your email. We will send you a link to set a new password.', <>
