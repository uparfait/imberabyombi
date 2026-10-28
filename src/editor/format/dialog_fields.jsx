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
