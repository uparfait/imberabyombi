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
    if (/^H[1-4]$/.test(p.tagName) || p.classList.contains('title')) { const s = p.textContent.replace(/\u200b/g, '').trim(); if (s) return s; }
    if (is_table(p)) break; p = p.previousElementSibling;
  }
  return 'Table ' + (i + 1);
}
export const top_tables = root => qsa('table', root).filter(t => !t.parentElement.closest('table'));
/* [{ name, hdr (first row is a header), rows: [[cell text…]…] }]; a spanned cell is followed by empty cells */
export function export_data(root) {
  const ts = top_tables(root);
  if (ts.length) return ts.map((t, i) => ({
    name: table_name(t, i), hdr: t.hasAttribute('data-header') || !!(t.rows[0] && t.rows[0].querySelector('th,[data-hdr]')),
    rows: Array.from(t.rows).map(r => {
      const a = []; Array.from(r.cells).forEach(c => { a.push(cell_text(c)); for (let k = 1; k < (c.colSpan || 1); k++) a.push(''); }); return a;
    })
  }));
  const lines = [];
