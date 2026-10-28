/* emails/mail_view.jsx: one email shown as in a mail app (subject, sender, the branded paper with header, body and
   footer), the Email designs page (#/admin/emails?t=…) and its template picker (a "Your modules" menu, no second sidebar). */
import { i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { route, ui } from '../store/index.js';
import { page_title } from '../ui/index.js';
import { tile_menu } from '../admin/index.js';
import { MAILS } from './mails.jsx';
import { mail_body } from './mail_body.jsx';

/* key={k}: a new mail is a new element, so the paper's rise animation plays again (the reference replaced the HTML) */
export const mail_view = k => {
  const m = mail_body(k);
  return (
    <article key={k} className="card overflow-hidden" aria-label={`${MAILS[k].l} email`}>
      <header className="border-b border-line p-4 sm:p-5"><h2 className="font-sans text-lg font-medium sm:text-xl">{m.s}</h2>
        <div className="mt-3 flex items-center gap-3">{i3('diamond', 'h-10 w-10')}<div className="min-w-0 flex-1 text-sm">
          <p className="truncate"><b className="font-medium">{cfg.name}</b> <span
            className="text-muted">&lt;no-reply@imberabyombi.com&gt;</span></p>
