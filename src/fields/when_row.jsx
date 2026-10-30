/* fields/when_row.jsx: a date, its times and their time zone on one line, as soft blocks, like a calendar app: "Friday,
   October 30 · 12:00pm – 1:00pm · GMT+2 · Kigali". Each block is the real field (a text date or time input, or the time
   zone's select: the picker opens on click and searches the zones; typing works), showing its value in words until it is
   being typed in. A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { pad, h24, zone_list, zone_short, page_tz } from '../lib/index.js';
import { dt_attrs, dt_show, to24 } from './date_formats.js';

/* a value in words: a date "Friday, October 30", a time "12:00pm" (or "12:00" on the 24-hour clock) */
export function in_words(t, v) {
  if (!v) return t === 'date' ? 'Pick a date' : 'Pick a time';
  if (t === 'date') { const d = new Date(`${v}T00:00`); return isNaN(d) ? v : d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }); }
  const [h, m] = to24(v).split(':').map(Number); if (isNaN(h) || isNaN(m)) return v;
