/* table/open_form.jsx: the add / edit form of a record (open_form), from its schema's fields, and sync_when: the fields
   that only some values use. File fields are <File_box/> already (field() draws them), so nothing is wrapped here. */
import { cap, qs, qsa } from '../lib/index.js';
import { db, ui, cur, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { field, when_row, fill_rows } from '../fields/index.js';
import { modal } from '../overlays/index.js';

/* fields; those a schema groups with row: 'when' (a date and its times) go on one line, where the first is */
const fields_of = (fs, row) => fs.map(f => !f.row ? field(f, row[f.k])
  : fs.find(x => x.row === f.row) === f ? when_row(fs.filter(x => x.row === f.row), row) : null);
/* the form's fields (not those kept out of forms: form: false), or only keys (one section). A schema with form_sec
   shows its sec groups under small headings ("When", "Location") */
const body_of = (s, row, keys) => { const fs = s.f.filter(f => f.form !== false && (!keys || keys.includes(f.k)));
  if (keys || !s.form_sec) return fields_of(fs, row);
  return Object.entries(s.sec).flatMap(([h, ks]) => { const g = fs.filter(f => ks.split(',').includes(f.k));
    return g.length ? [<h3 key={'sec_' + h} className="form_sec sm:col-span-2">{h}</h3>, ...fields_of(g, row)] : []; }); };

/* preset: values a new record starts with (on top of the fields' defaults and the page's preset). part: [title, keys]
   edits one section of a record only ("Edit location") */
export function open_form(c, id, preset = {}, part = null) {
  const s = schemas[c], row = id ? db.find(c, id) : { ...Object.fromEntries(s.f.filter(f => f.def).map(f => [f.k, f.def()])), ...(cur[c]?.preset || {}), ...preset };
  if (!row) return notify('It may have been deleted in another tab. Refresh the list and try again.', 'bad', 'Record not found');
  const before = qs('#modal form');
  modal({ title: part ? part[0] : `${id ? 'Edit' : 'New'} ${s.l}`, body: body_of(s, row, part?.[1]), submit: id ? 'Save changes' : `Add ${s.l}`,
    on_submit: async (d, form) => {
      s.f.forEach(f => { if (f.t === 'number' && d[f.k] !== '' && d[f.k] != null) d[f.k] = +d[f.k]; });
      if (s.before) { const r = await s.before(d, row, form); if (r === false) return false; d = r; }
      ui.flash = db.upsert(c, { ...row, ...d }); rerender();
      notify(id ? `Your changes to this ${s.l} are saved.` : `The new ${s.l} is in the list.`, 'ok', id ? 'Changes saved' : `${cap(s.l)} added`);
    } });
  /* modal() draws at once, except when called while React is drawing (a form opened after navigation): then a moment later */
  const f = qs('#modal form');
  if (f && f !== before) sync_when(f); else setTimeout(() => sync_when(qs('#modal form')));
}

/* data-when: "Done" or "!Done" (the status: F(..., { when: 'Done' })), or "<field>=A|B" / "<field>!=A" (any field of the
    el.hidden = !on; el.querySelectorAll('input, select, textarea').forEach(i => i.disabled = !on); });
  qsa('[data-fill-rows]', form).forEach(fill_rows); }
