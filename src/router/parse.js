/* router/parse.js: 14. ROUTER. The hash route (#/path?query) as { path, q }, and the page's title + SEO tags per route. */
import { qs } from '../lib/index.js';

export function parse() {
  const raw = location.hash.replace(/^#/, '') || '/', [p, query = ''] = raw.split('?');
  return { path: p.replace(/\/+$/, '') || '/', q: Object.fromEntries(new URLSearchParams(query)) };
