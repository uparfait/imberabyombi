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
