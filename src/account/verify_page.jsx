/* account/verify_page.jsx: #/verify: 2-step verification with a 6-digit code (FORMS.otp in actions), "trust this
   device", a resend button that counts down (resend_in; data-act="otp_resend" sends again) and a way to the authenticator set-up. */
import { ic } from '../icons/index.js';
import { after_render } from '../store/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';
import { otp_boxes } from './otp_boxes.jsx';
import { resend_in } from './resend_in.js';

export function verify_page() {
  after_render(() => resend_in(30));
  return auth_shell('2-step verification', 'Enter the 6-digit code from your authenticator app, or the code we sent to your email.', <>
