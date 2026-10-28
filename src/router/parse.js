/* router/parse.js: the route (/path?query, after the base path) as { path, q }, and the page's title + SEO tags
import { qs } from '../lib/index.js';

export function parse() {
  const raw = location.hash.replace(/^#/, '') || '/', [p, query = ''] = raw.split('?');
  return { path: p.replace(/\/+$/, '') || '/', q: Object.fromEntries(new URLSearchParams(query)) };
}

export function set_meta(title, desc) {
  document.title = title;   /* the browser tab shows only the active page */
  qs('meta[name=description]')?.setAttribute('content', desc || `${title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
  qs('meta[property="og:title"]')?.setAttribute('content', document.title);
}
