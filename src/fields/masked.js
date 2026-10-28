/* fields/masked.js: typing help for text date/time fields: the auto-format mask, the field's kind, and the ghost
   format hint drawn in the .date_hint span that field() renders EMPTY next to the input (filled here, never by React). */
import { esc, h24 } from '../lib/index.js';
import { DTF, dt_spec } from './date_formats.js';

/* Auto-format while typing: fill each part from the digits, pad or refuse per part, then add AM/PM in 12-hour mode */
export const masked = (t, s) => {
  const spec = DTF[t], twelve = /time/.test(t) && !h24(), groups = [...spec.mask.matchAll(/(#+)([^#]*)/g)].map(x => [x[1].length, x[2]]);
  const lim = { mo: [1, 12, 1], d: [3, 31, 1], w: [5, 53, 1], h: twelve ? [1, 12, 1] : [2, 23, 0], mi: [5, 59, 0] };   /* [max first digit, max value, min value] */
  let d = String(s).replace(/\D/g, ''), o = '', mins = '';
  for (let gi = 0; gi < groups.length && d; gi++) {
    const [n, sep] = groups[gi], L = lim[spec.parts[gi]], raw = d.slice(0, n); let g = raw, used = raw.length;
    if (L && +raw[0] > L[0]) { g = '0' + raw[0]; used = 1; }
    else if (L && raw.length === 2 && (+raw > L[1] || +raw < L[2])) { g = raw[0]; used = 2; }
    d = d.slice(used); o += g; if (spec.parts[gi] === 'mi') mins = g;
    if (g.length < n) break; if (d) o += sep;
  }
  if (twelve) { const ap = /[ap](?!.*[ap])/i.exec(s)?.[0];
    if (ap && /\d\d$/.test(o.split(/[ -]/).pop().split(':')[0] || '')) { if (!o.includes(':')) o += ':'; if (mins.length < 2) o = o.replace(/:(\d?)$/, (_, m) => ':' + (m || '0') + '0'); o += /p/i.test(ap) ? ' PM' : ' AM'; } }
  return o;
};
export const kind_of = a => a.dataset.type || a.type;
/* Show the rest of the format while typing (2026-1 → 2026-1M-DD, 09:30 → 09:30 AM); hidden when empty, complete or not focused */
export const ghost = (i, on = document.activeElement === i) => { const g = i.nextElementSibling; if (!g?.matches('.date_hint')) return; const v = i.value, ph = DTF[i.dataset.type] ? dt_spec(i.dataset.type).ph : '';
