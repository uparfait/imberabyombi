/* router/parse.js: the route (/path?query, after the base path) as { path, q }, and the page's title + SEO tags
   (description, og:title, canonical link) per route. */
import { qs } from '../lib/index.js';
import { app_path, mark_shown } from './history.js';

export function parse() {
  mark_shown();
  return { path: app_path().replace(/\/+$/, '') || '/', q: Object.fromEntries(new URLSearchParams(location.search)) };
}

export function set_meta(title, desc) {
  document.title = title;   /* the browser tab shows only the active page */
  qs('meta[name=description]')?.setAttribute('content', desc || `${title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
  qs('meta[property="og:title"]')?.setAttribute('content', document.title);
  /* the canonical link names this page: its domain stays (set it in index.html), the path is the current one */
  const c = qs('link[rel=canonical]'); if (c) c.setAttribute('href', new URL(location.pathname, c.href).href);
}
