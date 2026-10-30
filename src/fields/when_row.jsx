/* fields/when_row.jsx: a date and its times on one line, as soft blocks, like a calendar app: "Friday, October 30 ·
   12:00pm – 1:00pm". Each block is the real field (a text date or time input: the picker opens on click, typing works),
   showing its value in words until it is being typed in. A schema groups fields into one with row: 'when' (open_form). */
import { Fragment } from 'react';
import { pad, h24 } from '../lib/index.js';
