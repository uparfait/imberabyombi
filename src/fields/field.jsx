/* fields/field.jsx: a form field generated from a schema field (Imberabyombi outlined: label + control in a .field box).
   Uncontrolled: values go in as defaultValue and are read back with form_obj(form) when the form is submitted.
   The root carries key={f.k}, so a form can list fields directly: {schema.f.map(f => field(f, row[f.k]))}. */
import { options } from '../ui/index.js';
import { sub_editor, subs_of } from '../modules/index.js';
import { File_box } from '../files/index.js';
import { DTF, dt_attrs, dt_show } from './date_formats.js';
import { zone_list, device_tz } from '../lib/index.js';
import { seg_field } from './seg_field.jsx';
import { repeat_field } from './repeat_field.jsx';

/* Form field generated from a schema field (row: the whole record, for fields that read others) */
export function field(f, v, row) {
  const id = 'field_' + f.k, req = !!f.req, val = v ?? '', opts = typeof f.o === 'function' ? f.o() : (f.o || []);
  if (f.t === 'hidden') return <input key={f.k} type="hidden" name={f.k} defaultValue={val} />;
  if (f.t === 'seg') return seg_field(f, val);   /* a few choices as one segmented pill */
  if (f.t === 'repeat') return repeat_field(f, v, row);   /* how a recurring one repeats */
  let ctl; /* placeholder=" " lets the Imberabyombi label rest inside an empty field */
  /* a checklist (tasks): rows of tick + text, added and removed in place */
  if (f.t === 'subtasks') return <div key={f.k} className="sm:col-span-2"><p className="mb-2 text-sm font-medium">{f.l}</p>{sub_editor(subs_of({ subs: v }))}</div>;
  /* new attachments (kept with the record when it is saved; the ones it already has stay) */
  if (f.t === 'files') return <div key={f.k} className="field sm:col-span-2"><label htmlFor={id}>{f.l}</label><File_box id={id} multiple data-new-files="" /></div>;
  if (f.t === 'select') ctl = <select id={id} name={f.k} required={req} defaultValue={String(val)}><option value="">Choose…</option>{options(f, v)}</select>;
  /* a time zone: every zone, "(GMT+02:00) Central Africa Time - Kigali"; starts as the device's */
  else if (f.t === 'tz') ctl = <select id={id} name={f.k} required={req} defaultValue={val || device_tz()}>{zone_list().map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}</select>;
  else if (f.t === 'textarea') ctl = <textarea id={id} name={f.k} rows={3} placeholder=" " required={req} defaultValue={val} />;
  else if (f.t === 'list') ctl = <>
    <input id={id} name={f.k} data-list={'list_' + f.k} defaultValue={val} placeholder=" " autoComplete="off" required={req} />
    <datalist id={'list_' + f.k}>{opts.map((o, i) => <option key={i} value={o}></option>)}</datalist>
  </>;
  else if (DTF[f.t]) ctl = <>
    <input id={id} name={f.k} {...dt_attrs(f.t)} defaultValue={dt_show(f.t, val)} required={req} />
    <span className="date_hint" aria-hidden="true"></span>
  </>;
  else ctl = <input id={id} name={f.k} type={f.t} defaultValue={val} placeholder=" " min={f.min ?? undefined} max={f.max ?? undefined}
    autoComplete={f.t === 'email' ? 'email' : undefined} required={req} />;
  return (
    <div key={f.k} className={f.t === 'textarea' ? 'field sm:col-span-2' : 'field'} data-when={f.when || undefined}>
      <label htmlFor={id}>{f.l}{f.req ? <>{' '}<span className="text-accent" aria-hidden="true">*</span></> : null}</label>
      {ctl}
    </div>
  );
}
