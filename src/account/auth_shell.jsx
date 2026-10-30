/* ── Account pages (sign in, forgot password, 2-step verification, set password): one minimal, mobile-first shell.
      On the brand colour with the white pattern (as the home page's Thanks block), the form on its own card (edge to edge
      but for a small margin on phones). All of them are demos: any details are accepted. ──
   account/auth_shell.jsx: that shell, the links to the other account pages, and the password field with its eye button. */
import { ic } from '../icons/index.js';
import { logo, theme_btn } from '../ui/index.js';
import { cfg } from '../config/index.js';
import { to } from '../router/index.js';

/* body: the page's form and links (JSX) */
export const auth_shell = (title, text, body) => (
  <main id="main" className="auth_bg flex min-h-[100dvh] flex-col">
    <div className="pattern_layer" aria-hidden="true"></div>
      {logo()}
      <h1 className="mt-8 text-[2rem] leading-tight">{title}</h1><p className="mt-2 text-muted">{text}</p>
      {body}
    </section>
    <p className="px-6 py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {cfg.name} · <a href={to('/sitemap')} className="hover:text-accent">Privacy</a>
      {' · '}<a href={to('/sitemap')} className="hover:text-accent">Terms</a></p></main>
);

/* the other account pages (route paths stay as they are) */
const LINKS = [['login', 'Sign in'], ['forgot', 'Forgot password'], ['verify', '2-step verification'], ['authenticator', 'Authenticator app'],
  ['set-password', 'Set password']];
export const auth_links = cur => (
  <p className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted">{LINKS.filter(([k]) => k !== cur).map(([k, l]) => (
    <a key={k} href={to(`/${k}`)} className="hover:text-accent">{l}</a>
  ))}</p>
);

/* a password field (id = name) with a show/hide button (data-act="pwd"); attr: extra input props, e.g. { 'data-pw': '' } */
export const pw_field = (id, l, ac, attr = {}) => (
  <div className="field"><label htmlFor={id}>{l}</label><div className="relative">
    <input id={id} name={id} type="password" autoComplete={ac} required className="pr-12" placeholder=" " {...attr} />
    <button type="button" className="icon_btn absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2" data-act="pwd" aria-label="Show password">{ic('eye', 'h-5 w-5')}</button>
  </div></div>
);
