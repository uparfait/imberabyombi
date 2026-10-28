/* table/export_cols.jsx: the export dialog's "Columns to include": per column a tick + what it is shown as in the file.
   An unticked column cannot be renamed; with no column ticked the download is off and a note says why. This is state
   (React onChange), so the change listener only has to stop at these ticks (export_change). */
import { useLayoutEffect, useRef, useState } from 'react';
import { schemas } from '../schemas/index.js';
import { label } from '../ui/index.js';

export function Export_cols({ c }) {
  const cols = schemas[c].cols, ref = useRef(null), [on, set_on] = useState(() => Object.fromEntries(cols.map(k => [k, true])));
  const any = cols.some(k => on[k]);
  /* the Download button is the dialog's footer submit (drawn by modal()): its disabled flag follows the ticks */
