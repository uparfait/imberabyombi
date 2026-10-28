/* behaviors/key_events.js: form submits (data-form → FORMS through request()) and the keyboard: 6-box codes, the picker,
   Enter/Space on custom buttons, Enter in the task view editors, Ctrl/⌘ K, and Escape (menus, full-screen table, sidebar). */
import { qs, qsa } from '../lib/index.js';
import { ui, route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { request, validate } from '../feedback/index.js';
import { form_obj } from '../fields/index.js';
import { pick, PICK, tip } from '../overlays/index.js';
import { table_full } from '../table/index.js';
import { ACT, FORMS, close_pops, open_cmd } from '../actions/index.js';

function on_submit(e) {
  const f = e.target, k = f.dataset.form; if (!k || !FORMS[k]) return;
