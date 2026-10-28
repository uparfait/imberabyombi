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
function define_callout() {
  if (customElements.get('ds-callout')) return;
  customElements.define('ds-callout', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).append(document.getElementById('tpl_callout').content.cloneNode(true)); }
  });
}

/* tasks saved before their dates had a time: start at 09:00, due and completed at 17:00 */
function migrate_task_dates() {
  const rows = db.get('c:tasks'), bare = v => /^\d{4}-\d{2}-\d{2}$/.test(v || ''), K = ['start', 'due', 'end'];
  if (Array.isArray(rows) && rows.some(t => K.some(k => bare(t[k]))))
    db.save('tasks', rows.map(t => { const o = { ...t }; K.forEach(k => { if (bare(o[k])) o[k] += k === 'start' ? 'T09:00' : 'T17:00'; }); return o; }));
}

let booted = false;
export function boot() {
  if (booted) return; booted = true;
  install_listeners(); before_render(before_page); define_callout();
  addEventListener('hashchange', navigate);
  apply_tokens();
  migrate_task_dates();
