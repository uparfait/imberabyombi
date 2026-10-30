/* emails/mail_view.jsx: one email shown as in a mail app (subject, sender, the branded paper with header, body and
   footer), the Email designs page (/admin/emails?t=…) and its template picker (a "Your modules" menu, no second sidebar). */
import { mark3d } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, fmt_stamp } from '../lib/index.js';
import { route, ui } from '../store/index.js';
import { page_title } from '../ui/index.js';
import { tile_menu } from '../admin/index.js';
import { MAILS } from './mails.jsx';
import { mail_body } from './mail_body.jsx';
import { to } from '../router/index.js';

/* key={k}: a new mail is a new element, so the paper's rise animation plays again (React draws the paper anew instead of patching it) */
export const mail_view = k => {
  const m = mail_body(k);
  return (
    <article key={k} className="card overflow-hidden" aria-label={`${MAILS[k].l} email`}>
      <header className="border-b border-line p-4 sm:p-5"><h2 className="font-sans text-lg font-medium sm:text-xl">{m.s}</h2>
