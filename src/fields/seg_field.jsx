/* fields/seg_field.jsx: a few choices as one segmented pill of radios ("Upcoming | Live now | Recurring"), its title above
   with a help icon when the schema field has help. f.o: values or [value, label] pairs; f.on(e) runs when the choice
   changes (a schema's own step, such as filling in now). Fields can show for one choice only: { when: 'kind=Recurring' }. */
import { help_tip } from '../ui/index.js';

export const seg_field = (f, v) => { const id = 'field_' + f.k, opts = (typeof f.o === 'function' ? f.o() : f.o || []).map(o => Array.isArray(o) ? o : [o, o]);
