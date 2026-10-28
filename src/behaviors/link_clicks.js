/* behaviors/link_clicks.js: internal links move without reloading the page. A click on an <a href> of this site (same origin,
   inside the base path, no target or download, no modifier key, not an in-page #fragment, not a file) becomes go(path).
   It listens after the main click listener: links that one already handled (data-act, header sections on the home page) stay. */
import { go, app_path, in_base } from '../router/index.js';

function on_link(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href]'), href = a?.getAttribute('href'), target = a?.getAttribute('target');
