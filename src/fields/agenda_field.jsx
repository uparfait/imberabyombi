/* fields/agenda_field.jsx: an agenda in a form (field type 'agenda'): items, each with a time from and to, a title, a
   description and its presenter (name, email, title); "Add item" and × to remove one. agenda_from(form) reads the items
   back, agenda_ok(form) checks each ends after it starts. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { show_err } from '../feedback/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

const box = (k, n, l, v, x = {}) => { const { cls = '', ...a } = x;
  return <div className={`field ${cls}`}><label htmlFor={`ag_${n}_${k}`}>{l}</label>
    {n === 'desc' ? <textarea id={`ag_${n}_${k}`} name={`ag_${n}`} data-ag={n} rows={2} placeholder=" " defaultValue={v} />
      : <input id={`ag_${n}_${k}`} name={`ag_${n}`} data-ag={n} defaultValue={v} placeholder=" " {...a} />}
    {a['data-type'] ? <span className="date_hint" aria-hidden="true"></span> : null}</div>; };

function Agenda_editor({ v }) {
  const [items, set] = useState(() => (v || []).map(x => ({ ...x, k: uid() }))), t = dt_attrs('time');
  return <div className="ag_edit" data-agenda="">{items.map((x, i) => <div key={x.k} className="ag_item" data-ag-item="">
    <div className="ag_item_head"><b>{`Item ${i + 1}`}</b>
      <button type="button" className="icon_btn h-8 w-8" onClick={() => set(items.filter(y => y.k !== x.k))} aria-label={`Remove item ${i + 1}`} data-tip="Remove">{ic('x', 'h-4 w-4')}</button></div>
