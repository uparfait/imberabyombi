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
      notify(id ? `Your changes to this ${s.l} are saved.` : `The new ${s.l} is in the list.`, 'ok', id ? 'Changes saved' : `${cap(s.l)} added`);
    } });
  /* modal() draws at once, except when called while React is drawing (a form opened after navigation): then a moment later */
  const f = qs('#modal form');
  if (f && f !== before) sync_when(f); else setTimeout(() => sync_when(qs('#modal form')));
}

/* fields shown only for some statuses (F(..., { when: 'Done' }) or '!Done'); hidden ones are disabled, so they are not sent or checked */
export function sync_when(form) { const st = form?.elements.status?.value; if (st == null) return;
  qsa('[data-when]', form).forEach(el => { const w = el.dataset.when, on = w.startsWith('!') ? st !== w.slice(1) : st === w;
    el.hidden = !on; el.querySelectorAll('input, select, textarea').forEach(i => i.disabled = !on); });
  qsa('[data-fill-rows]', form).forEach(fill_rows); }
