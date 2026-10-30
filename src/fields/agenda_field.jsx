/* fields/agenda_field.jsx: an agenda in a form (field type 'agenda'): items, each with a time from and to, a title, a
   description and its presenter (name, email, title); "Add item" (it starts when the last one ends, or when the event
   starts) and × to remove one. agenda_from(form) reads the items back; agenda_ok() checks their times, which the page
   and the live screen follow (agenda_now.js). */
import { useState, useRef } from 'react';
import { uid, fmt_time } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { show_err } from '../feedback/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

const box = (k, n, l, v, x = {}) => { const { cls = '', ...a } = x;
  return <div className={`field ${cls}`}><label htmlFor={`ag_${n}_${k}`}>{l}</label>
    {n === 'desc' ? <textarea id={`ag_${n}_${k}`} name={`ag_${n}`} data-ag={n} rows={2} placeholder=" " defaultValue={v} />
      : <input id={`ag_${n}_${k}`} name={`ag_${n}`} data-ag={n} defaultValue={v} placeholder=" " {...a} />}
    {a['data-type'] ? <span className="date_hint" aria-hidden="true"></span> : null}</div>; };

function Agenda_editor({ v }) {
  const [items, set] = useState(() => (v || []).map(x => ({ ...x, k: uid() }))), t = dt_attrs('time'), box_el = useRef(null);
  const add = () => { const el = box_el.current, ends = [...el.querySelectorAll('[data-ag=to]')].map(i => to24(i.value)).filter(Boolean).sort();
    set([...items, { k: uid(), from: ends.pop() || to24(el.closest('form')?.elements.start?.value || '') }]); };
  return <div className="ag_edit" data-agenda="" ref={box_el}>{items.map((x, i) => <div key={x.k} className="ag_item" data-ag-item="">
    <div className="ag_item_head"><b>{`Item ${i + 1}`}</b>
      <button type="button" className="icon_btn h-8 w-8" onClick={() => set(items.filter(y => y.k !== x.k))} aria-label={`Remove item ${i + 1}`} data-tip="Remove">{ic('x', 'h-4 w-4')}</button></div>
    <div className="ag_grid">{box(x.k, 'from', 'From', dt_show('time', x.from || ''), { ...t, required: true })}{box(x.k, 'to', 'To', dt_show('time', x.to || ''), { ...t, required: true })}
      {box(x.k, 'title', 'Title', x.title, { required: true, cls: 'room_full' })}{box(x.k, 'desc', 'Description', x.desc, { cls: 'room_full' })}
      <p className="ag_cap room_full">Presenter</p>{box(x.k, 'p_name', 'Name', x.p_name)}{box(x.k, 'p_email', 'Email', x.p_email, { type: 'email' })}
      {box(x.k, 'p_title', 'Title', x.p_title, { cls: 'room_full' })}</div></div>)}
    <button type="button" className="btn btn_outline btn_sm justify-self-start" onClick={add}>{ic('plus', 'h-4 w-4')}Add item</button></div>;
}
export const agenda_field = (f, v) => <div key={f.k} className="room sm:col-span-2"><p className="ag_cap mb-2">{f.l}</p><Agenda_editor v={v} /></div>;

const val = (el, n) => (el.querySelector(`[data-ag=${n}]`)?.value || '').trim();
export const agenda_from = f => [...f.querySelectorAll('[data-ag-item]')].map(el => ({ from: to24(val(el, 'from')), to: to24(val(el, 'to')),
  title: val(el, 'title'), desc: val(el, 'desc'), p_name: val(el, 'p_name'), p_email: val(el, 'p_email').toLowerCase(), p_title: val(el, 'p_title') }))
  .sort((a, b) => a.from.localeCompare(b.from));

/* the agenda's times make sense: each item ends after it starts, within the event's start s and end e ("HH:MM"), and
   starts once the one before it has ended. A form with new times but no agenda checks the saved one (old) against them. */
export function agenda_ok(f, s, e, old = []) {
  const bad = (i, m) => { show_err(i, m); i?.focus(); return false; }, els = [...f.querySelectorAll('[data-ag-item]')];
  if (!f.querySelector('[data-agenda]')) { const k = f.elements.start ? (old || []).findIndex(a => (s && a.from < s) || (e && a.to > e)) : -1;
    return k < 0 || bad(f.elements[s && old[k].from < s ? 'start' : 'end'], `Agenda item ${k + 1} (${fmt_time(old[k].from)} – ${fmt_time(old[k].to)}) is outside.`); }
  const its = els.map((el, n) => ({ n, from: to24(val(el, 'from')), to: to24(val(el, 'to')), fi: el.querySelector('[data-ag=from]'), ti: el.querySelector('[data-ag=to]') }))
    .sort((a, b) => a.from.localeCompare(b.from));
  for (const [k, x] of its.entries()) { const p = its[k - 1];
    if (x.from && x.to && x.to <= x.from) return bad(x.ti, 'Pick an end after the start.');
    if (s && x.from && x.from < s) return bad(x.fi, `The event starts at ${fmt_time(s)}.`);
    if (e && x.to && x.to > e) return bad(x.ti, `The event ends at ${fmt_time(e)}.`);
    if (p?.to && x.from && x.from < p.to) return bad(x.fi, `Item ${p.n + 1} runs until ${fmt_time(p.to)}.`); }
