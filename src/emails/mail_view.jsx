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
        <div className="mt-3 flex items-center gap-3">{mark3d('#', 'h-10 w-10')}<div className="min-w-0 flex-1 text-sm">
          <p className="truncate"><b className="font-medium">{cfg.name}</b> <span
            className="text-muted">&lt;no-reply@imberabyombi.com&gt;</span></p>
          <p className="truncate text-muted">to you@lorem.io</p></div>
          <time className="shrink-0 text-xs text-muted">{fmt_stamp(Date.now(), { hour: 'numeric', minute: '2-digit' })}</time></div></header>
      <div className="mail_canvas"><div className="mail_paper">
        <div className="mail_top">
          <span className="font-display text-lg font-extrabold tracking-wide"><span className="text-brand">{cfg.logo[0]}</span>{cfg.logo[1]}</span></div>
        <div className="mail_body">{m.t}</div>
        <div className="mail_foot"><p>You receive this email because you have an account at {cfg.name}.</p>
          <p className="mt-1"><a href={to('/admin/emails')} className="underline">Email settings</a> · <a href={to('/admin/emails')}
            className="underline">Unsubscribe</a> · {lorem.t(2)} 12, {lorem.t(1)}</p></div>
      </div></div></article>
  );
};

/* the design shown: ?t= in the address, else the last one picked (ui.mail), else the invite */
export function emails_view() {
  const q = route.q, k = MAILS[q.t] ? q.t : (ui.mail && MAILS[ui.mail] ? ui.mail : 'invite');
  return (
    <>{page_title('Email designs', 'How messages from the system look: invites, updates, time changes, password resets, sign-in codes and access tokens. '
