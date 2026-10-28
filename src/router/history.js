/* router/history.js: path routes on the browser History API. to(path) is the address of an app path (the base path in front:
   import.meta.env.BASE_URL, '/' by default), app_path() reads it back, go(path) moves there and navigate() draws the page.
   Back / Forward (popstate) draw the page of the new address. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { render, render_flags } from '../store/index.js';
import { request, staff_page, reduced } from '../feedback/index.js';

/* the base path without its last slash: '' when the site sits at the domain root, '/repo' under https://host/repo/ */
const BASE = new URL(import.meta.env.BASE_URL || '/', location.origin).pathname.replace(/\/+$/, '');

/* to('/admin/tasks') → '/admin/tasks' (or '/repo/admin/tasks'): use it for every href */
export const to = (path = '/') => BASE + '/' + String(path).replace(/^\/+/, '');
/* is this pathname inside the site (under the base path)? */
export const in_base = p => !BASE || p === BASE || p.startsWith(BASE + '/');
/* the app path of an address (location by default) without the base path: '/admin/tasks' */
export const app_path = (u = location) => (in_base(u.pathname) ? u.pathname.slice(BASE.length) : u.pathname) || '/';

const here = () => location.pathname + location.search;
let shown = null, before = null;   /* the address on screen (parse() records it on every draw) and the one before it */
export const mark_shown = () => { const h = here(); if (h !== shown) { before = shown; shown = h; } };

/* Navigation is a user request: floating loader (only if slow) + cross-fade (View Transitions where supported) */
/* Moving between staff pages is a get: it waits for the page's data (cfg.latency) with the top loader and the clicked sidebar
   link spinning, then the page draws with its tables already filled. Public and sign-in pages draw at once. */
/* A navigation that starts during a cross-fade skips the old one (its ready promise rejects: expected, so it is caught). */
export const navigate = () => { const get = staff_page() && !!qs('#sidebar');
  return request(() => { render_flags.nav_fetched = get;
    if (!document.startViewTransition || reduced()) return render();
    document.startViewTransition(() => render()).ready.catch(() => {}); }, { delay: get ? cfg.latency : 0 }); };

/* go('/admin/tasks'): a new history entry, then the page draws. { replace: true } replaces the current entry instead
   (redirects). Going to the address already on screen does nothing. */
export function go(path, { replace = false } = {}) {
  const u = new URL(to(path), location.href);
  if (!replace && u.pathname + u.search === here()) return;
  history[replace ? 'replaceState' : 'pushState'](null, '', u.pathname + u.search + u.hash);
  return navigate();
}

/* Back / Forward. A jump to an in-page #fragment keeps the address of the page, so nothing is drawn again */
export const install_history = () => addEventListener('popstate', () => { if (here() !== shown) navigate(); });
