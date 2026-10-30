/* fields/when_row.jsx: a date, its times and their time zone on one line, as soft blocks, like a calendar app: "Friday,
   October 30 · 12:00pm – 1:00pm · GMT+2 · Kigali". Each block is the real field (a text date or time input, or the time
   zone's select: the picker opens on click and searches the zones; typing works), showing its value in words until it is
   being typed in. A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { pad, h24, zone_list, zone_short, page_tz } from '../lib/index.js';
