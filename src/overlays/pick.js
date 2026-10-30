/* overlays/pick.js: F. PICKERS. The one shared #picker (plain JS, outside React): open, draw, place, close, set a value,
   filter and keyboard. Its markup comes from PK (pick_html.js); the listeners that call it live in behaviors. */
import { qsa, ymd, add_d, parse_d, week_date, page_now } from '../lib/index.js';
import { kind_of, to24, set_native_value } from '../fields/index.js';
import { reduced } from '../feedback/index.js';
import { before_render } from '../store/index.js';
import { PK } from './pick_html.js';

/* F. PICKERS: one shared #picker serves every select (searchable, checkboxes when multiple), date, week, month,
      date & time, time and [data-list] suggestion field. The native control stays the source of truth, so forms,
      validation and FormData are unchanged. Typing always works: date/time fields keep native typing (desktop) and
      the picker follows what is typed; selects filter as you type. Wrap a select in .field or .pick to make it clickable. */
export const PICK = 'select, input[data-type]';
/* Calendar paging animation (picker, sidebar mini calendar, main calendar): n = 1 next slides in from the right,
   -1 back slides in from the left, 0 zooms in. The first element (title) moves less than the grid. */
export const slide_in = (els, n) => { if (reduced()) return; [...els].forEach((g, i) => g.animate(n
  ? [{ opacity: 0, transform: `translateX(${n * (i ? 1.75 : .75)}rem)` }, { opacity: 1, transform: 'none' }]
  : [{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.22,.8,.22,1)' })); };
export const FINE = () => matchMedia('(pointer: fine)').matches;
/* a multiple select shows its choices in the .multi_value element after it (rendered EMPTY by React) */
export const ms_sync = s => { const v = s.nextElementSibling; if (v?.matches('.multi_value')) v.textContent = [...s.selectedOptions].map(o => o.text).join(', '); };
export const pick = {
  el: document.getElementById('picker'), a: null, kb: false, mute: false, esc: false, mode: 'days', view: page_now(),
  from(a) { const v = a.value; return kind_of(a) === 'week' && /W\d/.test(v) ? week_date(v) : /^\d{4}-\d{2}/.test(v) ? parse_d(v) : page_now(); },
  open(a, kb = false) {
