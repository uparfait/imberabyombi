/* behaviors/link_clicks.js: internal links move without reloading the page. A click on an <a href> of this site (same origin,
   inside the base path, no target or download, no modifier key, not an in-page #fragment, not a file, not data-reload: an
   app of its own on this site, such as Qr-scan) becomes go(path).
   It listens after the main click listener: links that one already handled (data-act, header sections on the home page) stay. */
import { go, app_path, in_base } from '../router/index.js';

function on_link(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href]'), href = a?.getAttribute('href'), target = a?.getAttribute('target');
  if (!href || href.startsWith('#') || a.hasAttribute('download') || a.hasAttribute('data-reload') || (target && target !== '_self')) return;
  const u = new URL(href, location.href);
  if (u.origin !== location.origin || !in_base(u.pathname) || /\.[a-z0-9]+$/i.test(u.pathname)) return;
  if (u.hash && u.pathname + u.search === location.pathname + location.search) return;   /* a #fragment of this page */
  e.preventDefault(); go(app_path(u) + u.search + u.hash);
}

export const install_links = () => document.addEventListener('click', on_link);
