/* emails/sitemap.jsx: the Site map page's top block: a card per page (public, account and admin entry points)
   and the legal texts (privacy, terms, cookies) as collapsible sections. */
import { i3, hue_at } from '../icons/index.js';
import { lorem } from '../lib/index.js';
import { PUB, PAGES } from '../site/index.js';
import { to } from '../router/index.js';

export function sitemap() {
  const all = [['', 'Home', 'home'], ...PUB.map(([k, l]) => [k, l, PAGES[k].i]), ['intro', 'Overview', 'layers'], ['ui', 'Design system', 'grid'],
    ['login', 'Sign in', 'lock'], ['forgot', 'Forgot password', 'key'], ['verify', '2-step verification', 'shield'], ['authenticator', 'Authenticator app', 'shield'],
    ['set-password', 'Set password', 'lock'], ['admin', 'Dashboard', 'chart']];
  return (
    <section className="wrap section"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{all.map(([k, l, i]) => (
      <a key={k} href={to(`/${k}`)} className="card card_hover group flex items-center gap-4 p-5">{i3(i, 'h-11 w-11')}<span className="font-semibold">{l}</span></a>
    ))}</div>
      <div className="mt-14 grid max-w-3xl gap-3">{['Privacy policy', 'Terms of service', 'Cookies'].map(t => (
        <details key={t}><summary>{t}</summary><p className="px-5 pb-5 pt-3 text-muted">{lorem.p(4)}</p></details>
      ))}</div></section>
  );
}
