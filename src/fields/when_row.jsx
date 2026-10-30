/* fields/when_row.jsx: a date, its times and their time zone on one line, as soft blocks, like a calendar app: "Friday,
   October 30 · 12:00pm – 1:00pm · GMT+2 · Kigali". Each block is the real field (a text date or time input, or the time
   zone's select: the picker opens on click, below or above, and searches the zones; typing works as in any date field),
   over a small label ("Starts") and its value in words ("Pick a date" while empty), with an arrow that turns up while its
   list is open. A form's row starts empty but for the time zone (the device's; schema_events). A title above
   says what the row is ("Date, time and time zone"). It always stays on one line and the date and times always show in
   full: the words get smaller with the row, where it is narrow they get shorter ("Fri, Oct 30", "GMT+2"), then the arrows
   go (container queries). Only the time zone gives way; its whole name is on hover.
   A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { ic } from '../icons/index.js';
import { pad, h24, zone_list, zone_short, page_tz } from '../lib/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

/* a value in words, long and short: a date "Friday, October 30" / "Fri, Oct 30", a time "12:00pm" (or "12:00" on the
   24-hour clock) */
export function in_words(t, v) {
  if (!v) return t === 'date' ? 'Pick a date' : 'Pick a time';
  if (t === 'date') { const d = new Date(`${v}T00:00`); return isNaN(d) ? v : d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }); }
  const [h, m] = to24(v).split(':').map(Number); if (isNaN(h) || isNaN(m)) return v;
  return h24() ? `${pad(h)}:${pad(m)}` : `${h % 12 || 12}:${pad(m)}${h < 12 ? 'am' : 'pm'}`;
}

/* the time zone: a select of every zone ("(GMT+02:00) Central Africa Time - Kigali"), shown as "GMT+2 · Kigali", with its
   offset on the row's date (summer and winter time differ); a new date updates it */
const day_of = form => /^\d{4}-\d{2}-\d{2}$/.test(form?.elements.date?.value || '') ? form.elements.date.value : '';
const tz_words = form => { const s = form?.querySelector('.when_tz select'); if (s) s.nextSibling.textContent = zone_short(s.value, day_of(form)); };
const tz_block = (f, v, row) => { const id = 'field_' + f.k, tz = v || page_tz();
  return <Fragment key={f.k}><label htmlFor={id} className="sr-only">{f.l}</label>
    <span className="pick when_block when_tz"><select id={id} name={f.k} defaultValue={tz} required={!!f.req}
      onChange={e => tz_words(e.target.form)}>
      {zone_list().map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}</select>
      <span className="when_text" aria-hidden="true">{zone_short(tz, row.date)}</span></span></Fragment>; };

const block = (f, v, row) => { if (f.t === 'tz') return tz_block(f, v, row); const id = 'field_' + f.k, shown = dt_show(f.t, v);
  return <Fragment key={f.k}><label htmlFor={id} className="sr-only">{f.l}</label>
    <span className="pick when_block"><input id={id} name={f.k} {...dt_attrs(f.t)} defaultValue={shown} required={!!f.req}
      onInput={e => { e.target.nextSibling.textContent = in_words(f.t, e.target.value); if (f.t === 'date') tz_words(e.target.form); }} />
      <span className="when_text" aria-hidden="true">{in_words(f.t, shown)}</span></span></Fragment>; };

/* fs: the row's fields in order; a dash goes between two times (start – end) */
export const when_row = (fs, row) => <div key={'when_' + fs[0].k} className="when_row sm:col-span-2" role="group" aria-label="When">
  {fs.map((f, i) => <Fragment key={f.k}>{i && f.t === 'time' && fs[i - 1].t === 'time' ? <span className="when_dash" aria-hidden="true">–</span> : null}
    {block(f, row[f.k], row)}</Fragment>)}</div>;
