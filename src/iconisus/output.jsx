/* iconisus/output.jsx: the result at the chosen size: Copy SVG, Download (an .svg file) and the code itself on demand. */
import { useState } from 'react';
import { ic } from '../icons/index.js';
import { copy } from '../overlays/index.js';

function save(svg, name) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })), a = document.createElement('a');
  a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function Output({ st, draw }) {
  const [code, set_code] = useState(false), svg = draw({ size: st.size });
  return <section className="grid gap-3" aria-label="Result">
    <div className="flex gap-2">
      <button type="button" className="btn btn_primary btn_sm flex-1" onClick={() => copy(svg, 'SVG')}>{ic('copy', 'h-4 w-4')}Copy SVG</button>
      <button type="button" className="btn btn_outline btn_sm" onClick={() => save(svg, `icon_${st.style}.svg`)}>{ic('download', 'h-4 w-4')}Download</button>
      <button type="button" className="icon_btn" aria-expanded={code} aria-label={code ? 'Hide the code' : 'Show the code'} data-tip="SVG code"
        onClick={() => set_code(!code)}>{ic('data_object')}</button></div>
