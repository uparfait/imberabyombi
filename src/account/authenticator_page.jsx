/* Authenticator app set-up: its own page (scan, or type the key, then confirm with a code)
   account/authenticator_page.jsx: #/authenticator. The form is FORMS.otp with setup=1 (actions). */
import { copy_box } from '../overlays/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';
import { otp_boxes } from './otp_boxes.jsx';
import { qr_svg } from './qr_svg.js';
