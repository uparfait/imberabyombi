/* fields/people_field.jsx: a list of people in a form (field type 'people', such as co-organisers): a name and an email
   each, "Add" and × to remove one. people_from(form, key) reads them back. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
import { ic } from '../icons/index.js';

function People_editor({ k, v, add }) {
  const [rows, set] = useState(() => (v || []).map(x => ({ ...x, i: uid() })));
  return <div className="pp_edit" data-people={k}>{rows.map(r => <div key={r.i} className="pp_row" data-pp-row="">
    <div className="field"><label htmlFor={`pp_n_${r.i}`}>Name</label><input id={`pp_n_${r.i}`} name={`${k}_name`} data-pp="name" defaultValue={r.name} placeholder=" " required /></div>
    <div className="field"><label htmlFor={`pp_e_${r.i}`}>Email</label><input id={`pp_e_${r.i}`} name={`${k}_email`} data-pp="email" type="email" defaultValue={r.email} placeholder=" " required /></div>
    <button type="button" className="icon_btn h-8 w-8" onClick={() => set(rows.filter(x => x.i !== r.i))} aria-label="Remove" data-tip="Remove">{ic('x', 'h-4 w-4')}</button></div>)}
