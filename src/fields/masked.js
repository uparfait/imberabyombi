/* fields/masked.js: typing help for text date/time fields: the auto-format mask, the field's kind, and the ghost
   format hint drawn in the .date_hint span that field() renders EMPTY next to the input (filled here, never by React). */
import { esc, h24 } from '../lib/index.js';
import { DTF, dt_spec } from './date_formats.js';

/* Auto-format while typing: fill each part from the digits, pad or refuse per part, then add AM/PM in 12-hour mode */
export const masked = (t, s) => {
  const spec = DTF[t], twelve = /time/.test(t) && !h24(), groups = [...spec.mask.matchAll(/(#+)([^#]*)/g)].map(x => [x[1].length, x[2]]);
