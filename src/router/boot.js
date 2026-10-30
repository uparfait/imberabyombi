/* router/boot.js: Boot. Saved design tokens, old saved tasks brought up to date, the top layer, the text-selection switch, the
   <ds-callout> web component, the delegated listeners, the per-draw cleanups, then the router draws the page of the address. */
import { db, before_render } from '../store/index.js';
import { raise_top } from '../feedback/index.js';
import { apply_tokens } from '../actions/index.js';
import { install_listeners } from '../behaviors/index.js';
import { before_page } from './render_hooks.js';
import { navigate, install_history } from './history.js';

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
  install_history();   /* Back / Forward */
  apply_tokens();
  migrate_task_dates();
  raise_top();   /* #toasts and #loader join the top layer */
  document.documentElement.classList.toggle('allow_select', !!db.get('allowSelect'));   /* the account menu's text-selection switch */
