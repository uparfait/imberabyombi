/* fields/seg_field.jsx: a few choices as one segmented pill of radios ("Upcoming | Live now | Recurring"), its title above
   with a help icon when the schema field has help. f.o: values or [value, label] pairs; f.on(e) runs when the choice
   changes (a schema's own step, such as filling in now). Fields can show for one choice only: { when: 'kind=Recurring' }. */
import { help_tip } from '../ui/index.js';

export const seg_field = (f, v) => { const id = 'field_' + f.k, opts = (typeof f.o === 'function' ? f.o() : f.o || []).map(o => Array.isArray(o) ? o : [o, o]);
  return <div key={f.k} className="seg_field sm:col-span-2" data-when={f.when || undefined}>
    <p id={id} className="seg_cap">{f.l}{f.help ? help_tip(f.help, f.l.toLowerCase()) : null}</p>
    <div className="seg max-w-full overflow-x-auto" role="radiogroup" aria-labelledby={id}>
      {opts.map(([ov, ol]) => <label key={ov}><input type="radio" className="sr-only" name={f.k} value={ov} defaultChecked={String(v) === String(ov)}
