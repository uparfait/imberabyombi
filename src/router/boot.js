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
