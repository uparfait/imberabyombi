/* fields/form_values.js: reading form values as saved (time 24-hour "HH:MM", date & time "YYYY-MM-DDTHH:MM"),
   converting time fields on screen after a 12h ↔ 24h switch, and setting a React-owned input's value from code. */
import { qsa, h24 } from '../lib/index.js';
import { dt_spec, dt_show, to24 } from './date_formats.js';

/* Form values: time fields saved as 24-hour "HH:MM", date & time as "YYYY-MM-DDTHH:MM" */
export const dt_iso = v => { const [dd, ...tm] = String(v).trim().split(' '); return tm.length ? `${dd}T${to24(tm.join(' '))}` : dd; };   /* "2026-10-28 09:30 PM" → "2026-10-28T21:30" */
