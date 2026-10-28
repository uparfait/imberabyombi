/* fields/field.jsx: a form field generated from a schema field (Imberabyombi outlined: label + control in a .field box).
   Uncontrolled: values go in as defaultValue and are read back with form_obj(form) when the form is submitted.
   The root carries key={f.k}, so a form can list fields directly: {schema.f.map(f => field(f, row[f.k]))}. */
import { options } from '../ui/index.js';
