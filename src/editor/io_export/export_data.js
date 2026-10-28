/* editor/io_export/export_data.js: the document as data for spreadsheets: every top-level table becomes a sheet (named
   after the heading above it); with no tables, each paragraph or list item becomes one row. CSV (.csv) writes it. */
import { qsa, download, is_list, is_table, is_break } from '../core/index.js';

export function cell_text(c) {
  const ps = qsa('p,h1,h2,h3,h4,h5,h6,li,pre,blockquote', c).filter(p => !p.querySelector('p,li'));
  return (ps.length ? ps.map(p => p.textContent).join('\n') : c.textContent).replace(/\u200b/g, '').trim();
}
export function table_name(t, i) {
  let p = t.previousElementSibling, k = 0;
  while (p && k++ < 4) {
