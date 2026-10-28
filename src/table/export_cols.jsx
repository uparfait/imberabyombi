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
  useLayoutEffect(() => { const b = ref.current?.form?.querySelector('footer button:not([type=button])'); if (b) b.disabled = !any; }, [any]);
  const tick = k => e => { const v = e.target.checked; set_on(o => ({ ...o, [k]: v })); };
  return (
    <fieldset ref={ref} className="sm:col-span-2" data-export-cols=""><legend className="mb-2 text-sm font-medium">Columns to include</legend>
      <div className="grid gap-2">{cols.map(k => (
        <div key={k} className="export_col">
          <label className="flex w-36 shrink-0 cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" name={`col_${k}`} value="1" defaultChecked onChange={tick(k)} /><span className="truncate">{label(c, k)}</span></label>
          <span className="shrink-0 text-xs text-muted">shown as</span>
