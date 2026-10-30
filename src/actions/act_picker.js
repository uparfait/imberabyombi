/* actions/act_picker.js: data-act handlers inside the shared #picker (plain JS, outside React): options, clear / done,
   calendar days, times, month and year paging, 12 / 24-hour switch and Today. The native control stays the source of truth. */
import { qsa, ymd, now_dt, parse_d, iso_week, page_now } from '../lib/index.js';
import { db } from '../store/index.js';
import { pick, FINE } from '../overlays/index.js';
import { kind_of, dt_show, dt_refresh } from '../fields/index.js';

export const PICKER_ACT = {
  pk_opt: t => { const a = pick.a, o = a?.options[+t.dataset.i]; if (!o) return;
    if (a.multiple) { o.selected = !o.selected; t.setAttribute('aria-selected', o.selected); pick.emit(); } else { a.selectedIndex = o.index; pick.emit(); pick.close(pick.kb || FINE()); } },
  pk_clear: () => { const a = pick.a; if (!a) return; [...a.options].forEach(o => o.selected = false); qsa('[data-act=pk_opt]', pick.el).forEach(b => b.setAttribute('aria-selected', 'false')); pick.emit(); },
  pk_done: () => pick.close(pick.kb || FINE()),
  pk_set: t => pick.set(t.dataset.v),
  pk_day: t => { const a = pick.a, v = t.dataset.v; if (!a) return;
    if (kind_of(a) === 'week') return pick.set(iso_week(parse_d(v)));
    if (kind_of(a) === 'datetime-local') { pick.view = parse_d(v); return pick.set(`${v} ${a.value.slice(11) || dt_show('time', '09:00')}`, false); }
    pick.set(v); },
  pk_time: t => { const a = pick.a; if (a) pick.set(kind_of(a) === 'datetime-local' ? `${a.value.slice(0, 10) || ymd()} ${dt_show('time', t.dataset.v)}` : dt_show('time', t.dataset.v)); },
  pk_nav: t => { const v = pick.view, n = +t.dataset.n; pick.view = pick.a && kind_of(pick.a) === 'month' ? new Date(v.getFullYear() + n, 0, 1) : new Date(v.getFullYear(), v.getMonth() + n, 1); pick.draw(); pick.slide(n); },
  pk_h24: t => { db.set('h24', t.dataset.v === '1'); dt_refresh(); pick.draw(); },
