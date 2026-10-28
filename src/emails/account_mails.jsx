/* emails/account_mails.jsx: the account emails: password reset (button + copyable link), sign-in code (big
   one-time code) and access token (shown once, scopes, expiry). Codes, links and tokens can be copied. */
import { ic } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, fmt_d, ymd, add_d } from '../lib/index.js';
import { copy_box } from '../overlays/index.js';
import { mail_btn } from './mails.jsx';

const chars = (n, set) => Array.from({ length: n }, () => lorem.pick(set.split(''))).join('');

export const account_mails = () => ({
  reset: { s: 'Reset your password', t: <>
    <h1 className="mail_h">Reset your password</h1><p>We received a request to reset the password for <b>you@lorem.io</b>. This link works once
      and expires in <b>30 minutes</b>.</p>
    <div>{mail_btn('Set a new password', 'btn_primary', '#/set-password')}</div>
    <p className="text-sm text-muted">If the button does not work, copy this link into your browser:</p>
