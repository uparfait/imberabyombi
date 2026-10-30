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
import { to, go } from './history.js';

export function public_page(r) {
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
