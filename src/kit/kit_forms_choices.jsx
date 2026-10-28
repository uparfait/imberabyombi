/* kit/kit_forms_choices.jsx: the "Choices" fieldset of the Forms specimen: grouped select, input with suggestions,
   searchable multiple select, colour, files, range, checkboxes, radios and switches. Each part is built in the
   reference's order (the lorem calls happen as each element is created), so the sample text matches. */
import { lorem } from '../lib/index.js';
import { File_box } from '../files/index.js';

const choice = (c, i, type, name, role) => (
  <label key={i} className="flex items-center gap-3 font-normal"><input type={type} name={name} role={role} defaultChecked={!!c} /> {lorem.t(2)}</label>
);

export function kit_forms_choices(brand_hex) {
  const groups = (
    <div className="field"><label htmlFor="demo_select">Select with groups</label><select id="demo_select">
      <optgroup label={lorem.t(1)}><option>{lorem.t(2)}</option><option>{lorem.t(2)}</option></optgroup>
      <optgroup label={lorem.t(1)}><option>{lorem.t(2)}</option></optgroup></select></div>
  );
  const suggest = (
    <div className="field"><label htmlFor="demo_list">Input with suggestions</label>
      <input id="demo_list" data-list="demo_list_options" placeholder="Type to search" autoComplete="off" />
      <datalist id="demo_list_options">{Array.from({ length: 8 }, (_, i) => <option key={i} value={lorem.t(2)}></option>)}</datalist></div>
  );
  const multi = Array.from({ length: 10 }, () => lorem.t(2));   /* the first two start selected */
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><legend>Choices</legend>
      {groups}{suggest}
      <div className="field"><label htmlFor="demo_multi">Multiple select (searchable)</label>
        <select id="demo_multi" name="multi" multiple defaultValue={multi.slice(0, 2)}>{multi.map((v, i) => <option key={i}>{v}</option>)}</select>
        <span className="multi_value truncate" aria-hidden="true"></span></div>
      <div className="field"><label htmlFor="demo_color">Colour</label><input id="demo_color" type="color" defaultValue={brand_hex} /></div>
      <div className="field sm:col-span-2 lg:col-span-1"><label htmlFor="demo_file">Files (any type)</label><File_box id="demo_file" multiple /></div>
      <div className="field"><label htmlFor="demo_range">Range <output id="demo_range_out">40</output></label>
        <input id="demo_range" type="range" defaultValue="40" data-out="#demo_range_out" /></div>
      <div className="grid content-start gap-3"><p className="text-sm font-semibold">Checkboxes</p>{[1, 0].map((c, i) => choice(c, i, 'checkbox'))}</div>
      <div className="grid content-start gap-3"><p className="text-sm font-semibold">Radios</p>{[1, 0].map((c, i) => choice(c, i, 'radio', 'krad'))}</div>
      <div className="grid content-start gap-3"><p className="text-sm font-semibold">Switch</p>{[1, 0].map((c, i) => choice(c, i, 'checkbox', undefined, 'switch'))}</div>
    </fieldset>
  );
}
