/* router/parse.js: the route (/path?query, after the base path) as { path, q }, and the page's title + SEO tags
   (description, og:title, canonical link) per route. */
import { qs } from '../lib/index.js';
import { app_path, mark_shown } from './history.js';

export function parse() {
  mark_shown();
}

export function set_meta(title, desc) {
  document.title = title;   /* the browser tab shows only the active page */
  qs('meta[name=description]')?.setAttribute('content', desc || `${title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
  qs('meta[property="og:title"]')?.setAttribute('content', document.title);
}
