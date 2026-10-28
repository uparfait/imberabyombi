/* editor/format/table_model.js: table building blocks: the style presets, building a table, applying a preset and the
   automatic header / stripe backgrounds, and row / column surgery that respects merged cells (colspan slots).
   A "chain" is a table split across pages: its parts are separate <table>s (the later ones carry data-cont). */
import { el } from '../core/index.js';

/* ================= tables ================= */
/* document colours (the page is paper: these are not theme colours) */
export const HDR_BG = '#e8eaed', STRIPE_BG = '#f8f9fa';
export const TABLE_PRESETS = [
  { key: 'grid', label: 'Grid', bw: 1, bc: '#000000', header: false, striped: false, style: '' },
  { key: 'header', label: 'Header', bw: 1, bc: '#9aa0a6', header: true, striped: false, style: '' },
  { key: 'striped', label: 'Striped', bw: 1, bc: '#dadce0', header: true, striped: true, style: '' },
  { key: 'minimal', label: 'Lines', bw: 1, bc: '#9aa0a6', header: true, striped: false, style: 'minimal' },
  { key: 'none', label: 'No borders', bw: 0, bc: '#000000', header: false, striped: false, style: '' }
];
/* opts: { width: % of the line, preset: key } */
export function build_table(rows, cols, opts = {}) {
  const t = el('table', { class: 'doc_table' }); const tb = el('tbody'); t.appendChild(tb);
  for (let i = 0; i < rows; i++) { const tr = el('tr'); for (let j = 0; j < cols; j++) tr.appendChild(el('td', {}, '<p><br></p>')); tb.appendChild(tr); }
  if (opts.width && opts.width < 100) t.style.width = opts.width + '%';
  if (opts.preset) apply_preset([t], opts.preset);
  return t;
}
export const chain_rows = chain => chain.flatMap(t => Array.from(t.rows));
export function apply_preset(chain, key) {
  const p = TABLE_PRESETS.find(x => x.key === key) || TABLE_PRESETS[0];
  chain.forEach(t => {
    t.style.setProperty('--bw', p.bw + 'px'); t.style.setProperty('--bc', p.bc);
    if (p.style) t.setAttribute('data-style', p.style); else t.removeAttribute('data-style');
    t.toggleAttribute('data-header', p.header); t.toggleAttribute('data-striped', p.striped);
  });
  restyle_table(chain);
}
/* header row flag + automatic backgrounds (cells with a colour the user chose keep it) */
export function restyle_table(chain) {
  const hdr = chain[0].hasAttribute('data-header'), str = chain[0].hasAttribute('data-striped');
  chain_rows(chain).forEach((r, i) => Array.from(r.cells).forEach(c => {
    if (i === 0 && hdr) c.setAttribute('data-hdr', ''); else c.removeAttribute('data-hdr');
    if (c.style.backgroundColor && !c.hasAttribute('data-autobg')) return;
    const bg = (i === 0 && hdr) ? HDR_BG : (str && (i - (hdr ? 1 : 0)) % 2 === 1) ? STRIPE_BG : '';
    c.style.backgroundColor = bg; c.toggleAttribute('data-autobg', !!bg); if (!c.getAttribute('style')) c.removeAttribute('style');
  }));
}
/* each cell of a row with the grid columns it covers: [{ cell, start, end }] */
export function row_slots(row) { let c = 0; return Array.from(row.cells).map(cell => { const s = c; c += cell.colSpan || 1; return { cell, start: s, end: c - 1 }; }); }
export function cell_at_col(row, col) {
  if (!row) return null; const s = row_slots(row).find(x => col >= x.start && col <= x.end);
  return s ? s.cell : row.cells[row.cells.length - 1] || null;
