/* modules/tv_act.js: the task view's rows and status (part of TASK_ACT). A pen opens a row's editor (Save / Cancel); Save
   checks the field (the start never comes after the due / completed time); the status shows Cancel / Save once changed. */
import { db } from '../store/index.js';
import { qs, now_dt, fmt_dt } from '../lib/index.js';
import { request, reduced, show_err, err_text } from '../feedback/index.js';
import { field_val, set_native_value } from '../fields/index.js';
import { snap } from '../overlays/index.js';
import { read_subs } from './task_data.js';
import { when_d } from './task_dates.jsx';
import { task_refresh } from './task_view.jsx';
import { tv_api } from './tv_state.js';

const row_of = t => t.closest('[data-tv-row]');
const set_edit = (t, on) => { const k = row_of(t).dataset.tvRow; tv_api(t)?.put(s => ({ edit: { ...s.edit, [k]: on } })); };
const fresh = () => { const f = qs('#modal form'); if (f) f._init = snap(f); };   /* closing now asks nothing */
const status_box = t => t.closest('[data-tv-status]');

/* a date row's value against the other date: the start never comes after the due / completed time */
function date_err(k, v, r) {
  const s = k === 'start' ? v : r.start, e = k === 'due' || k === 'end' ? v : r.status === 'Done' ? r.end : r.due;
  if (!(/^(start|due|end)$/.test(k) && s && e && when_d(e) < when_d(s))) return '';
  return k === 'start' ? `Use a time on or before the ${r.status === 'Done' ? 'completed' : 'due'} time.` : 'Use a time on or after the start.';
}

export const TV_ACT = {
  tv_edit: t => { const cell = row_of(t).querySelector('.kv_cell'); set_edit(t, true);
    cell.querySelector('input:not([type=checkbox]), textarea, select')?.focus(); if (!reduced()) cell.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 180 }); },
  tv_cancel: t => { set_edit(t, false); fresh(); },
