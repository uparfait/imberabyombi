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
  e.preventDefault(); if (!validate(f)) return;
  request(() => FORMS[k](form_obj(f), f), { btn: f.querySelector('button:not([type=button])') });
}

function on_keydown(e) {
  const t = e.target, k = e.key; tip.hide();
  if (t.matches?.('.otp_box')) { const bs = qsa('.otp_box', t.closest('[data-otp]')), i = bs.indexOf(t);
    if (k === 'Backspace' && !t.value && i > 0) { e.preventDefault(); bs[i - 1].value = ''; bs[i - 1].focus(); }
    if (k === 'ArrowLeft' && i > 0) { e.preventDefault(); bs[i - 1].focus(); } if (k === 'ArrowRight' && i < bs.length - 1) { e.preventDefault(); bs[i + 1].focus(); } }
  if (k === 'Escape' && pick.a) { e.preventDefault(); pick.close(true); pick.esc = true; setTimeout(() => pick.esc = false); return; }
  if (pick.a && t.closest?.('#picker')) return pick.keys(e);
  if (pick.a && k === 'Tab') pick.close();
  if (t.matches?.(PICK)) { /* open the picker from the keyboard; on a select, typing a letter opens it with the search filled in */
    const sel = t.tagName === 'SELECT';
    if (k === 'F4' || (e.altKey && k === 'ArrowDown') || (sel && (k === 'Enter' || k === ' '))) { e.preventDefault(); pick.open(t, true); }
    else if (sel && k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault(); pick.open(t, true); const q = pick.el.querySelector('[data-pk-q]'); if (q) { q.value = k; pick.filter(k); } }
  }
  if (t.dataset?.list != null && pick.a === t && k === 'ArrowDown') { e.preventDefault(); pick.el.querySelector('.pk_item')?.focus(); }
