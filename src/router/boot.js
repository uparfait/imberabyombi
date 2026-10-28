/* router/boot.js: Boot. Saved design tokens, old saved tasks brought up to date, the top layer, the text-selection switch, the
   <ds-callout> web component, the delegated listeners, the per-draw cleanups, then the hash router draws the first page. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { db, render, render_flags, before_render } from '../store/index.js';
import { request, staff_page, reduced, raise_top } from '../feedback/index.js';
import { apply_tokens } from '../actions/index.js';
import { install_listeners } from '../behaviors/index.js';
import { before_page } from './render_hooks.js';

/* Navigation is a user request: floating loader (only if slow) + cross-fade (View Transitions where supported) */
/* Moving between staff pages is a get: it waits for the page's data (cfg.latency) with the top loader and the clicked sidebar
   link spinning, then the page draws with its tables already filled. Public and sign-in pages draw at once. */
export const navigate = () => { const get = staff_page() && !!qs('#sidebar');
  return request(() => { render_flags.nav_fetched = get; document.startViewTransition && !reduced() ? document.startViewTransition(() => render()) : render(); },
    { delay: get ? cfg.latency : 0 }); };

/* Web component: <ds-callout> clones #tpl_callout into its shadow root */
