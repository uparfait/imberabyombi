/* router/pages.jsx: what each kind of route draws: the public website (and the design system), the staff (admin) pages behind
   sign-in and permissions, the account pages, and the page shown when a view fails. */
import { hash_str, lorem } from '../lib/index.js';
import { route } from '../store/index.js';
import { auth, MODS } from '../auth/index.js';
import { empty } from '../ui/index.js';
import { PAGES, home, detail, pub_header, footer } from '../site/index.js';
import { kit } from '../kit/index.js';
import { admin_shell } from '../admin/index.js';
import { VIEWS, forbidden, not_found } from '../modules/index.js';
import { login_page, forgot_page, verify_page, authenticator_page, set_password_page } from '../account/index.js';
import { set_meta } from './parse.js';
import { attend_page } from '../events/index.js';
import { to, go } from './history.js';

export function public_page(r) {
  if (r.path.startsWith('/attend/')) return attend_page(r);   /* an attendance page: no header or footer */
  const k = r.path.slice(1); let inner, title;
  if (r.path === '/') { inner = home(); title = 'Home'; }
  else if (k === 'ui') { inner = kit(); title = 'Design system'; }
  else if (PAGES[k]) { inner = detail(k); title = PAGES[k].t; }
  else { inner = not_found(); title = 'Page not found'; }
  set_meta(title); lorem.seed(5);
  return (
    <div className="relative isolate flex min-h-[100dvh] flex-col">{pub_header()}
      <main id="main" tabIndex={-1} className="page_enter flex-1 outline-none">{inner}</main>{footer()}</div>
  );
}

/* Signed out: to sign-in (then back here). A session whose role is gone: signed out. Both return null (the page stays) and
   replace the address once this draw is over (a draw cannot start the next one) */
let redirecting = 0;
const redirect = path => { if (!redirecting) redirecting = setTimeout(() => { redirecting = 0; go(path, { replace: true }); }); return null; };
export function admin_page(r) {
  if (!auth.user) return redirect('/login?next=' + encodeURIComponent(r.path));
  if (!auth.role()) { auth.logout(); return redirect('/login'); }
  const mod = r.path.split('/')[2] || MODS.find(m => auth.can(m.k))?.k || 'settings', m = MODS.find(x => x.k === mod);
  route.mod = mod; lorem.seed(hash_str(mod));
  const body = !m ? not_found(true) : !auth.can(mod) ? forbidden() : VIEWS[mod]();
  set_meta(route.title || m?.l || 'Not found');
  if ((m?.full || route.full) && auth.can(mod)) return <main id="main" tabIndex={-1} className="outline-none">{body}</main>;   /* full-window modules (the editor) and pages (a live screen: route.full) */
  return admin_shell(mod, body);   /* a view may name its page (route.title), e.g. nested navigation */
}

/* Account pages share one shell (auth_shell); each route = [tab title, page] */
export const AUTH_ROUTES = {
  '/login': ['Sign in', r => login_page(r)], '/forgot': ['Forgot password', r => forgot_page(r)], '/verify': ['2-step verification', () => verify_page()],
  '/authenticator': ['Authenticator app', () => authenticator_page()], '/set-password': ['Set password', () => set_password_page()]
};

export const error_page = () => (
  <main id="main" className="wrap py-20">
    {empty('Something went wrong', 'This page could not be shown. Reload the page, or reset demo data in Settings.',
      <a href={to('/')} className="btn btn_primary btn_sm">Go to home page</a>, 'alert', 'bad')}
  </main>
);
