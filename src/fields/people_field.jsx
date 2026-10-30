/* fields/people_field.jsx: a list of people in a form (field type 'people', such as co-organisers): a name and an email
   each, "Add" and × to remove one. people_from(form, key) reads them back. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
import { ic } from '../icons/index.js';

function People_editor({ k, v, add }) {
  const [rows, set] = useState(() => (v || []).map(x => ({ ...x, i: uid() })));
  return <div className="pp_edit" data-people={k}>{rows.map(r => <div key={r.i} className="pp_row" data-pp-row="">
    <div className="field"><label htmlFor={`pp_n_${r.i}`}>Name</label><input id={`pp_n_${r.i}`} name={`${k}_name`} data-pp="name" defaultValue={r.name} placeholder=" " required /></div>
