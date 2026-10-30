/* fields/when_row.jsx: a date and its times on one line, as soft blocks, like a calendar app: "Friday, October 30 ·
   12:00pm – 1:00pm". Each block is the real field (a text date or time input: the picker opens on click, typing works),
   showing its value in words until it is being typed in. A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { pad, h24 } from '../lib/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

/* a value in words: a date "Friday, October 30", a time "12:00pm" (or "12:00" on the 24-hour clock) */
export function in_words(t, v) {
  if (!v) return t === 'date' ? 'Pick a date' : 'Pick a time';
  if (t === 'date') { const d = new Date(`${v}T00:00`); return isNaN(d) ? v : d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }); }
  const [h, m] = to24(v).split(':').map(Number); if (isNaN(h) || isNaN(m)) return v;
  return h24() ? `${pad(h)}:${pad(m)}` : `${h % 12 || 12}:${pad(m)}${h < 12 ? 'am' : 'pm'}`;
}

const block = (f, v) => { const id = 'field_' + f.k, shown = dt_show(f.t, v);
  return <Fragment key={f.k}><label htmlFor={id} className="sr-only">{f.l}</label>
    <span className="pick when_block"><input id={id} name={f.k} {...dt_attrs(f.t)} defaultValue={shown} required={!!f.req}
      onInput={e => { e.target.nextSibling.textContent = in_words(f.t, e.target.value); }} />
      <span className="when_text" aria-hidden="true">{in_words(f.t, shown)}</span></span></Fragment>; };

/* fs: the row's fields in order; a dash goes between two times (start – end) */
export const when_row = (fs, row) => <div key={'when_' + fs[0].k} className="when_row sm:col-span-2" role="group" aria-label="When">
  {fs.map((f, i) => <Fragment key={f.k}>{i && f.t === 'time' && fs[i - 1].t === 'time' ? <span className="when_dash" aria-hidden="true">–</span> : null}
