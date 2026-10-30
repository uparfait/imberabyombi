/* kit/kit_forms.jsx: the Forms specimen: text inputs, the date and time row, choices and feedback fieldsets, a textarea,
   Save (an inline message, data-act="demo_save") and Reset. The form never submits (onSubmit calls preventDefault). */
import { lorem } from '../lib/index.js';
import { kit_forms_text } from './kit_forms_text.jsx';
import { kit_forms_choices } from './kit_forms_choices.jsx';
import { kit_forms_feedback } from './kit_forms_feedback.jsx';
import { kit_forms_when } from './kit_forms_when.jsx';

export const kit_forms = brand_hex => (
  <form className="on_bg grid gap-6" data-calc="" onSubmit={e => e.preventDefault()}>
    {kit_forms_text()}
    {kit_forms_when()}
    {kit_forms_choices(brand_hex)}
    {kit_forms_feedback()}
    <div className="field"><label htmlFor="demo_textarea">Textarea</label><textarea id="demo_textarea" placeholder={lorem.s()}></textarea></div>
    <div className="flex gap-2"><button className="btn btn_primary" type="button" data-act="demo_save">Save</button>
      <button className="btn btn_outline" type="reset">Reset</button></div></form>
);
