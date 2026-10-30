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
    if (!a || a.disabled) return;
    if (this.a && this.a !== a) this.close();
    this.a = a; this.kb = kb; this.mode = 'days'; this.view = this.from(a); a.dataset.open = ''; a.setAttribute('aria-expanded', 'true');
    (a.closest('dialog[open]') || document.body).append(this.el);
    this.draw(); if (this.el.hidden) return;
    const q = this.el.querySelector('[data-pk-q]');
    if (q && (kb || FINE())) q.focus({ preventScroll: true });
    else if (kb && !q && a.dataset.list == null) (this.el.querySelector('[aria-selected=true]') || this.el.querySelector('.today, .pk_item'))?.focus({ preventScroll: true });
  },
  close(refocus = false) {
    const a = this.a; if (!a) return;
    this.a = null; this.el.hidden = true; this.el.innerHTML = ''; delete a.dataset.open; a.removeAttribute('aria-expanded');
    if (refocus) { this.mute = true; a.focus({ preventScroll: true }); this.mute = false; }
  },
  emit() { const a = this.a; this.mute = true; a.dispatchEvent(new Event('input', { bubbles: true })); a.dispatchEvent(new Event('change', { bubbles: true })); this.mute = false; },
  /* the control is React's: its value goes in through the native setter, so React sees the change */
  set(v, done = true) { if (!this.a) return; set_native_value(this.a, v); this.emit(); done ? this.close(this.kb || FINE()) : this.draw(); },
  draw() {
    const a = this.a, el = this.el, t = kind_of(a); let h = '', kind = 'menu';
    if (a.dataset.list != null) h = PK.list(a);
    else if (a.tagName === 'SELECT') h = PK.opts(a);
    else if (t === 'time') h = PK.times(to24(a.value));
    else { kind = 'cal'; h = this.mode === 'years' ? PK.years() : t === 'month' ? PK.months(a) : t === 'datetime-local' ? `<div class="pk_dt">${PK.cal(a)}${PK.times(to24(a.value.slice(11)))}</div>${PK.foot('Now')}` : PK.cal(a); }
    el.dataset.kind = kind; el.dataset.type = t; el.innerHTML = h; el.hidden = !h; if (!h) return;
    this.place();
    el.querySelectorAll('.pk_list, .pk_years').forEach(box => { const s = box.querySelector('[aria-selected=true]') || box.querySelector('[data-near]'); if (s) box.scrollTop = s.offsetTop - (box.clientHeight - s.offsetHeight) / 2; });
  },
  place() {
    const p = this.el, a = this.a; if (!a || p.hidden) return;
    const r = a.getBoundingClientRect(), vw = innerWidth, vh = innerHeight; if (r.bottom < 0 || r.top > vh) return this.close();
    const below = vh - r.bottom - 12, above = r.top - 12;
    p.style.minWidth = p.dataset.kind === 'menu' ? `max(${r.width}px, 12rem)` : '';   /* at least 12rem: grows with the page scale */
    p.style.maxHeight = Math.max(below, above, 160) + 'px';
    const w = p.offsetWidth, h = p.offsetHeight;
    p.style.left = Math.max(8, Math.min(r.left, vw - w - 8)) + 'px';
    p.style.top = (h <= below || below >= above ? r.bottom + 4 : Math.max(8, r.top - 4 - h)) + 'px';
  },
  slide(n) { slide_in(this.el.querySelectorAll('.pk_title, .pk_grid, .pk_years, .pk_cal > .grid'), n); },
  filter(q) {
    const list = this.el.querySelector('.pk_list'); if (!list) return; q = q.toLowerCase().trim(); let any = false;
    qsa('.pk_item', list).forEach(b => { b.hidden = !!q && !b.textContent.toLowerCase().includes(q); any ||= !b.hidden; });
    qsa('.pk_group', list).forEach(g => { let n = g.nextElementSibling, vis = false; while (n?.matches('.pk_item')) { vis ||= !n.hidden; n = n.nextElementSibling; } g.hidden = !vis; });
    const none = list.querySelector('.pk_none'); if (none) none.hidden = any;
  },
  keys(e) {
    const t = e.target, k = e.key, items = () => qsa('.pk_item:not([hidden]):not([disabled]), .pk_mon', this.el);
    if (k === 'Tab') return this.close(true);
    if (t.matches('[data-pk-q]')) { if (k === 'ArrowDown' || k === 'Enter') { e.preventDefault(); const b = items()[0]; k === 'Enter' ? b?.click() : b?.focus(); } return; }
    if (t.matches('.pk_day') && k.startsWith('Arrow')) {
      e.preventDefault(); const d = add_d(parse_d(t.dataset.v), { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[k]);
      if (d.getMonth() !== this.view.getMonth() || d.getFullYear() !== this.view.getFullYear()) { const n = d > this.view ? 1 : -1; this.view = new Date(d.getFullYear(), d.getMonth(), 1); this.draw(); this.slide(n); }
      return this.el.querySelector(`.pk_day[data-v="${ymd(d)}"]`)?.focus();
    }
    if (k === 'ArrowDown' || k === 'ArrowUp') {
