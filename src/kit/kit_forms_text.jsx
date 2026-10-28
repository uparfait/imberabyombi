/* kit/kit_forms_text.jsx: the "Text inputs" fieldset of the Forms specimen: one field per input type. Date and time
   types are text fields with a mask (dt_attrs) and an empty hint the field helpers fill; search gets the search buttons. */
import { lorem } from '../lib/index.js';
import { DTF, dt_attrs } from '../fields/index.js';
import { search_ui } from '../ui/index.js';

const TYPES = [['text', 'Text'], ['email', 'Email'], ['password', 'Password'], ['number', 'Number'], ['tel', 'Phone'], ['url', 'URL'], ['search', 'Search'],
  ['date', 'Date'], ['time', 'Time'], ['datetime-local', 'Date & time'], ['month', 'Month'], ['week', 'Week']];

export const kit_forms_text = () => (
  <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><legend>Text inputs</legend>{TYPES.map(([t, l]) => {
    const id = `demo_${t.replace('-', '_')}`;
    return (
      <div key={t} className="field"><label htmlFor={id}>{l}</label><input id={id} {...(DTF[t] ? dt_attrs(t) : { type: t, placeholder: lorem.w(2) })} />
