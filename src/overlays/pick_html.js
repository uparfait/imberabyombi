/* overlays/pick_html.js: the picker's markup builders (HTML strings: #picker is plain JS, outside React): options with
   a search (selects), suggestions ([data-list] fields), the times list, the calendar, months and years. */
import { esc, pad, ymd, add_d, iso_week, fmt_d, to_min, h24, fmt_time } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { search_ui_html } from '../ui/index.js';
import { kind_of } from '../fields/index.js';
import { pick } from './pick.js';

export const PK = {
  opts(a) {
    const row = o => `<button type="button" class="pk_item" role="option" aria-selected="${o.selected}" data-act="pk_opt" data-i="${o.index}" ${o.disabled ? 'disabled' : ''}>`
      + `${a.multiple ? '<span class="pk_box" aria-hidden="true"></span>' : ''}<span class="truncate ${o.value === '' ? 'text-muted' : ''}">${esc(o.text)}</span></button>`;
    return `<label class="pk_search"><span class="sr-only">Search options</span><input type="search" data-pk-q placeholder="Search" autocomplete="off">${search_ui_html()}</label>
    <div class="pk_list" role="listbox" ${a.multiple ? 'aria-multiselectable="true"' : ''}>${[...a.children].map(n => n.tagName === 'OPTGROUP'
      ? `<p class="pk_group">${esc(n.label)}</p>${[...n.children].map(row).join('')}` : row(n)).join('')}<p class="pk_none" hidden>No matches</p></div>
    ${a.multiple ? `<div class="pk_foot mx-2 mb-2"><button type="button" class="btn btn_ghost btn_sm" data-act="pk_clear">Clear</button>`
      + `<button type="button" class="btn btn_ghost btn_sm text-accent" data-act="pk_done">Done</button></div>` : ''}`;
  },
  list(a) {
    const q = a.value.toLowerCase().trim(), vs = [...(document.getElementById(a.dataset.list)?.options || [])].map(o => o.value)
      .filter(v => v && v.toLowerCase().includes(q) && v.toLowerCase() !== q).slice(0, 50);
    return vs.length ? `<div class="pk_list" role="listbox">${vs.map(v => `<button type="button" class="pk_item" role="option" data-act="pk_set" data-v="${esc(v)}">`
      + `${ic_html('search', 'h-4 w-4 shrink-0 text-muted')}<span class="truncate">${esc(v)}</span></button>`).join('')}</div>` : '';
  },
  times(v) {
    const near = v ? Math.min(95, Math.floor(to_min(v) / 15)) : 36;
    const on = h24();
    return `<div class="flex min-h-0 flex-col"><div class="pk_clock" role="group" aria-label="Clock format">${[[0, '12h'], [1, '24h']]
      .map(([n, l]) => `<button type="button" data-act="pk_h24" data-v="${n}" aria-pressed="${!!n === on}">${l}</button>`).join('')}</div>
    <div class="pk_list pk_times" role="listbox">${Array.from({ length: 96 }, (_, i) => { const t = `${pad(i >> 2)}:${pad(i % 4 * 15)}`;
      return `<button type="button" class="pk_item" role="option" aria-selected="${t === v}" ${i === near ? 'data-near' : ''} data-act="pk_time" data-v="${t}">`
        + `${fmt_time(t)}</button>`; }).join('')}</div></div>`;
  },
  head: (title, unit) => `<div class="pk_head"><button type="button" class="pk_title" data-act="pk_years" aria-label="${title}, choose a year">`
    + `${title}${ic_html('chev_d', 'h-4 w-4 text-muted')}</button><div class="flex"><button type="button" class="icon_btn h-8 w-8" data-act="pk_nav" data-n="-1" aria-label="Previous ${unit}">${ic_html('chev_l', 'h-4 w-4')}</button>`
    + `<button type="button" class="icon_btn h-8 w-8" data-act="pk_nav" data-n="1" aria-label="Next ${unit}">${ic_html('chev_r', 'h-4 w-4')}</button></div></div>`,
  foot: now => `<div class="pk_foot"><button type="button" class="btn btn_ghost btn_sm" data-act="pk_set" data-v="">Clear</button>`
    + `<button type="button" class="btn btn_ghost btn_sm text-accent" data-act="pk_today">${now}</button></div>`,
  cal(a) {
    const wk = kind_of(a) === 'week', sel = wk ? a.value : a.value.slice(0, 10), b = pick.view, f = new Date(b.getFullYear(), b.getMonth(), 1);
    const s = add_d(f, -f.getDay()), td = ymd();
    return `<div class="pk_cal">${PK.head(f.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }), 'month')}<div class="pk_grid">`
      + `${'SMTWTFS'.split('').map(d => `<span aria-hidden="true">${d}</span>`).join('')}${Array.from({ length: 42 }, (_, i) => { const x = add_d(s, i), k = ymd(x);
      return `<button type="button" class="pk_day ${x.getMonth() !== f.getMonth() ? 'out' : ''} ${k === td ? 'today' : ''}" aria-selected="${wk ? iso_week(x) === sel : k === sel}"`
        + ` aria-label="${fmt_d(k)}" data-act="pk_day" data-v="${k}">${x.getDate()}</button>`; }).join('')}</div>`
      + `${kind_of(a) === 'datetime-local' ? '' : PK.foot(wk ? 'This week' : 'Today')}</div>`;
  },
  months(a) {
    const y = pick.view.getFullYear(), cur = ymd().slice(0, 7);
    return `<div class="pk_cal">${PK.head(String(y), 'year')}<div class="grid grid-cols-3 gap-1 py-1">${Array.from({ length: 12 }, (_, i) => { const k = `${y}-${pad(i + 1)}`;
      return `<button type="button" class="pk_mon ${k === cur ? 'today' : ''}" aria-selected="${k === a.value}" data-act="pk_set" data-v="${k}">`
        + `${new Date(y, i, 1).toLocaleDateString(undefined, { month: 'short' })}</button>`; }).join('')}</div>${PK.foot('This month')}</div>`;
  },
  years() {
    const y = pick.view.getFullYear(), now = new Date().getFullYear();
    return `<div class="pk_cal"><p class="mb-2 px-1 text-sm font-medium">Choose a year</p><div class="pk_years">${Array.from({ length: 201 }, (_, i) => 1900 + i)
