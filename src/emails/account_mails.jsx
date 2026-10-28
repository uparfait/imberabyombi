/* emails/account_mails.jsx: the account emails: password reset (button + copyable link), sign-in code (big
   one-time code) and access token (shown once, scopes, expiry). Codes, links and tokens can be copied. */
import { ic } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, fmt_d, ymd, add_d } from '../lib/index.js';
import { copy_box } from '../overlays/index.js';
import { mail_btn } from './mails.jsx';
