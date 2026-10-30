/* table/open_form.jsx: the add / edit form of a record (open_form), from its schema's fields, and sync_when: the fields
   that only some statuses use. File fields are <File_box/> already (field() draws them), so nothing is wrapped here. */
import { cap, qs, qsa } from '../lib/index.js';
import { db, ui, cur, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { field, when_row } from '../fields/index.js';
import { modal } from '../overlays/index.js';

/* the form's fields; those a schema groups with row: 'when' (a date and its times) go on one line, where the first is */
const body_of = (s, row) => s.f.map(f => !f.row ? field(f, row[f.k])
  : s.f.find(x => x.row === f.row) === f ? when_row(s.f.filter(x => x.row === f.row), row) : null);

/* preset: values a new record starts with (on top of the fields' defaults and the page's preset) */
export function open_form(c, id, preset = {}) {
  const s = schemas[c], row = id ? db.find(c, id) : { ...Object.fromEntries(s.f.filter(f => f.def).map(f => [f.k, f.def()])), ...(cur[c]?.preset || {}), ...preset };
  if (!row) return notify('It may have been deleted in another tab. Refresh the list and try again.', 'bad', 'Record not found');
  const before = qs('#modal form');
  modal({ title: `${id ? 'Edit' : 'New'} ${s.l}`, body: body_of(s, row), submit: id ? 'Save changes' : `Add ${s.l}`,
    on_submit: async (d, form) => {
      s.f.forEach(f => { if (f.t === 'number' && d[f.k] !== '' && d[f.k] != null) d[f.k] = +d[f.k]; });
      if (s.before) { const r = await s.before(d, row, form); if (r === false) return false; d = r; }
      ui.flash = db.upsert(c, { ...row, ...d }); rerender();
