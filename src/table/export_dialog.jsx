/* table/export_dialog.jsx: Export (every table): CSV, JSON or Excel. The dialog picks a date range (on the table's first date
   column; none without one), filters (fixed-choice columns; none when its schema says export_filters: false), the
import { schemas, field_spec } from '../schemas/index.js';
import { ui } from '../store/index.js';
import { label, options } from '../ui/index.js';
import { field } from '../fields/index.js';
import { form_msg, show_err } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
import { Export_cols } from './export_cols.jsx';
import { EXPORTS, date_key, export_file } from './export_file.js';

/* fixed-choice columns (status, priority…) become filters; All keeps every value */
const filters = (c, sels) => (
  <fieldset className="grid gap-4 sm:col-span-2 sm:grid-cols-2" data-fill-rows=""><legend className="mb-2 text-sm font-medium">Filters</legend>{sels.map(f => (
    <div key={f.k} className="field"><label htmlFor={`field_flt_${f.k}`}>{label(c, f.k)}</label>
      <select id={`field_flt_${f.k}`} name={`flt_${f.k}`} defaultValue={ui.q[c]?.[f.k] || ''}><option value="">All</option>{options(f, ui.q[c]?.[f.k] || '')}</select></div>))}
  </fieldset>
);

export function export_dialog(c, fmt) {
  const s = schemas[c], dk = date_key(c), name = EXPORTS.find(x => x[0] === fmt)?.[1] || 'CSV';
  const sels = s.cols.map(k => s.f.find(f => f.k === k)).filter(f => f?.t === 'select');   /* fixed-choice columns (status, priority…) become filters */
  const help = `Rows that match the table's search${dk ? `, with ${label(c, dk).toLowerCase()} between the two times (leave them empty for all)` : ''}`
    + `${sels.length ? ' and the filters (All keeps every value)' : ''}. Tick the columns to include and change what each is shown as in the file.`;
  modal({ title: `Export as ${name}`, help,
    body: <>
      {dk ? <>{field(field_spec('from', 'From', 'datetime-local'), '')}{field(field_spec('to', 'To', 'datetime-local'), '')}</>
        : <p className="text-sm text-muted sm:col-span-2">This table has no dates to pick a range from.</p>}
      {sels.length ? filters(c, sels) : null}
      <Export_cols c={c} />
    </>,
    submit: `Download ${name}`,
    on_submit: (d, f) => { const cols = s.cols.filter(k => d['col_' + k]);
      if (!cols.length) { form_msg(f, 'bad', 'Choose at least one column', 'Tick the columns to include.', false); return false; }
      if (d.from && d.to && d.from > d.to) { show_err(f.elements.to, 'Use a time on or after From.'); return false; }
      export_file(c, fmt, cols.map(k => [k, (d['as_' + k] || '').trim() || label(c, k)]), d.from, d.to,
        Object.fromEntries(sels.map(x => [x.k, d['flt_' + x.k] || '']))); } });
}
