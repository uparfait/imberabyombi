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
