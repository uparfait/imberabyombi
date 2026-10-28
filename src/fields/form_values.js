/* fields/form_values.js: reading form values as saved (time 24-hour "HH:MM", date & time "YYYY-MM-DDTHH:MM"),
   converting time fields on screen after a 12h ↔ 24h switch, and setting a React-owned input's value from code. */
import { qsa, h24 } from '../lib/index.js';
import { dt_spec, dt_show, to24 } from './date_formats.js';

/* Form values: time fields saved as 24-hour "HH:MM", date & time as "YYYY-MM-DDTHH:MM" */
export const dt_iso = v => { const [dd, ...tm] = String(v).trim().split(' '); return tm.length ? `${dd}T${to24(tm.join(' '))}` : dd; };   /* "2026-10-28 09:30 PM" → "2026-10-28T21:30" */
export const field_val = i => i.dataset.type === 'time' ? to24(i.value) : i.dataset.type === 'datetime-local' ? dt_iso(i.value) : i.value.trim();   /* one input, as saved */
export const form_obj = f => { const d = Object.fromEntries(new FormData(f));
  f.querySelectorAll('[data-type=time][name]').forEach(i => { if (d[i.name]) d[i.name] = to24(d[i.name]); });
  f.querySelectorAll('[data-type=datetime-local][name]').forEach(i => { if (d[i.name]) d[i.name] = dt_iso(d[i.name]); });
  return d; };
/* After switching 12h ↔ 24h: every time field on screen converts its value and its format hints */
