/* behaviors/input_events.js: the input listener (date masks, table column search, picker filtering, 6-box codes, password
   rules, range fills, live outputs, list filters, design tokens, calc forms, clearing fixed errors) and code pasting. */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { clear_err } from '../feedback/index.js';
import { DTF, masked, ghost } from '../fields/index.js';
import { pick } from '../overlays/index.js';
import { refresh } from '../table/index.js';
import { pw_check } from '../account/index.js';
import { fill_range, set_token } from '../actions/index.js';

function on_input(e) {
  const t = e.target;
  /* date & time text fields: add the separators while typing at the end (2026-10-28, 09:30, 2026-W44…) */
  if (DTF[t.dataset?.type] && e.inputType?.startsWith('insert') && t.selectionStart === t.value.length) t.value = masked(t.dataset.type, t.value);
  if (DTF[t.dataset?.type]) ghost(t);
  if (t.dataset.search != null) { const c = t.dataset.search; ui.q[c] = { ...ui.q[c], [t.dataset.k]: t.value }; ui.page[c] = 1; refresh(c); }
  if (t.dataset.pkQ != null) pick.filter(t.value);
  /* 6-box code: one digit per box, jump to the next box, send when all six are in */
  if (t.matches?.('.otp_box')) { t.value = t.value.replace(/\D/g, '').slice(-1); const bs = qsa('.otp_box', t.closest('[data-otp]'));
    if (t.value) (bs[bs.indexOf(t) + 1] || t).focus(); if (bs.every(b => b.value)) t.form?.requestSubmit(); }
  if (t.dataset.pw != null) pw_check(t);
