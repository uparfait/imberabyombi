/* account/verify_page.jsx: /verify: 2-step verification with a 6-digit code (FORMS.otp in actions), "trust this
   device", a resend button that counts down (resend_in; data-act="otp_resend" sends again) and a way to the authenticator set-up. */
import { ic } from '../icons/index.js';
import { after_render } from '../store/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';
import { otp_boxes } from './otp_boxes.jsx';
import { resend_in } from './resend_in.js';
import { to } from '../router/index.js';

export function verify_page() {
  after_render(() => resend_in(30));
  return auth_shell('2-step verification', 'Enter the 6-digit code from your authenticator app, or the code we sent to your email.', <>
    <form data-form="otp" className="on_bg mt-8 grid gap-6" noValidate><div data-msg-slot="" className="empty:hidden"></div>
      {otp_boxes('Verification code')}
      <label className="flex cursor-pointer items-center gap-3 justify-self-start text-sm font-normal">
        <input type="checkbox" name="trust" />Trust this device for 30 days</label>
      <button className="btn btn_primary w-full">Verify</button>
      <button type="button" className="btn btn_ghost -mt-3 w-full" data-act="otp_resend" id="otp_resend" disabled>Resend code</button>
    </form>
    <a href={to('/authenticator')} className="auth_row mt-6">{ic('shield', 'h-5 w-5 shrink-0 text-muted')}<span className="min-w-0 flex-1">
      <b className="block font-medium">Set up an authenticator app</b></span>
      {ic('chev_r', 'h-4 w-4 shrink-0 text-muted')}</a>{auth_links('verify')}
  </>);
}
