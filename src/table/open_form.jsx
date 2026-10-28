/* table/open_form.jsx: the add / edit form of a record (openForm), from its schema's fields, and syncWhen: the fields
   that only some statuses use. File fields are <File_box/> already (field() draws them), so nothing is wrapped here. */
import { cap, qs, qsa } from '../lib/index.js';
import { db, ui, cur, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { field } from '../fields/index.js';
import { modal } from '../overlays/index.js';

/* preset: values a new record starts with (on top of the fields' defaults and the page's preset) */
export function open_form(c, id, preset = {}) {
  const s = schemas[c], row = id ? db.find(c, id) : { ...Object.fromEntries(s.f.filter(f => f.def).map(f => [f.k, f.def()])), ...(cur[c]?.preset || {}), ...preset };
  if (!row) return notify('It may have been deleted in another tab. Refresh the list and try again.', 'bad', 'Record not found');
  const before = qs('#modal form');
  modal({ title: `${id ? 'Edit' : 'New'} ${s.l}`, body: s.f.map(f => field(f, row[f.k])), submit: id ? 'Save changes' : `Add ${s.l}`,
    on_submit: async (d, form) => {
