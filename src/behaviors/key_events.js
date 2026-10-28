/* behaviors/key_events.js: form submits (data-form → FORMS through request()) and the keyboard: 6-box codes, the picker,
   Enter/Space on custom buttons, Enter in the task view editors, Ctrl/⌘ K, and Escape (menus, full-screen table, sidebar). */
import { qs, qsa } from '../lib/index.js';
import { ui, route } from '../store/index.js';
