/* editor/format/dialog_fields.jsx: the template's outlined fields for the table dialogs (uncontrolled: defaultValue,
   read back with form_obj on submit; each field's name is its id). min / max / step are checked by the template's
   validate() on submit, so a value read from the document is fitted into the range first (num_props). */
import { clamp } from '../core/index.js';

/* number field props for a current value v: clamped into [min, max]; step 'any' when v is off the step grid */
export function num_props(v, min, max, step = 1) {
  const d = clamp(v, min, max); return { min, max, step: Math.abs(d / step - Math.round(d / step)) < 1e-9 ? step : 'any', defaultValue: d };
}

/* a number field: props = min, max, step, defaultValue */
export const num_field = (id, label, props) => (
  <div className="field"><label htmlFor={id}>{label}</label><input id={id} name={id} type="number" placeholder=" " {...props} /></div>
);
/* a select: opts = [[value, label], …] */
export const sel_field = (id, label, opts, value) => (
  <div className="field"><label htmlFor={id}>{label}</label>
    <select id={id} name={id} defaultValue={value}>{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
