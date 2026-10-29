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
