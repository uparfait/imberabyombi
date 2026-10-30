/* Authenticator app set-up: its own page (scan, or type the key, then confirm with a code)
   account/authenticator_page.jsx: /authenticator. The form is FORMS.otp with setup=1 (actions). */
import { copy_box } from '../overlays/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';
import { otp_boxes } from './otp_boxes.jsx';
import { qr_svg } from './qr_svg.js';

const TEXT = 'Get sign-in codes from an app on your phone, such as Imberabyombi Authenticator or Microsoft Authenticator. It works offline.';

export function authenticator_page() {
  const key = 'JBSW Y3DP EHPK 3PXP';
  return auth_shell('Set up an authenticator app', TEXT, <>
    <form data-form="otp" className="on_bg mt-8 grid gap-6" noValidate><div data-msg-slot="" className="empty:hidden"></div>
      <input type="hidden" name="setup" defaultValue="1" />
      <ol className="auth_steps">
        <li><p className="font-medium">Scan with the app</p>
          <div className="mt-3 flex justify-center" dangerouslySetInnerHTML={{ __html: qr_svg(key) }}></div></li>
        <li><p className="font-medium">Or enter this key</p><div className="mt-3">{copy_box(key, 'Key')}</div></li>
      </ol>
      <button className="btn btn_primary w-full">Turn on</button></form>{auth_links('authenticator')}
  </>);
}
