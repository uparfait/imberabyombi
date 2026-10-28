/* editor/io_export/export_rtf.js: Rich Text (.rtf) for WordPad and older editors: paragraphs, lists (marks + tab),
   tables (borders, shading, header rows), page breaks, rules, PNG / JPEG pictures, links; the paper size and margins. */
import { state, dims, download, is_list, is_table, is_break, to_hex } from '../core/index.js';
import { RTF_P, rtf_ci, rtf_esc, rtf_inline, rtf_para } from './rtf_parts.js';
import { prepare_images } from './docx_image.js';

function rtf_list(rx, l, lvl) {
  let o = '', k = parseInt(l.getAttribute('start')) || 1; const kind = l.classList.contains('checklist') ? 'check' : l.tagName === 'OL' ? 'num' : 'bul';
  Array.from(l.children).forEach(li => {
    if (is_list(li)) { o += rtf_list(rx, li, lvl + 1); return; } if (li.tagName !== 'LI') return;
    const mark = kind === 'check' ? (li.getAttribute('data-checked') === 'true' ? '☑' : '☐') : kind === 'num' ? `${k++}.` : ['•', '◦', '▪'][lvl % 3];
    o += `${RTF_P}\\fi-360\\li${720 * (lvl + 1)} ${rtf_esc(mark)}\\tab ${rtf_inline(rx, li, {})}\\par\n`;
    Array.from(li.children).filter(is_list).forEach(s => { o += rtf_list(rx, s, lvl + 1); });
  });
  return o;
}
function rtf_table(rx, t) {
  const rows = Array.from(t.rows); if (!rows.length) return '';
  const n = Math.max(1, ...rows.map(r => Array.from(r.cells).reduce((a, c) => a + (c.colSpan || 1), 0)));
  const col_w = Math.round(rx.content_tw * (parseFloat(t.style.width) || 100) / 100 / n);
  const bw = parseFloat(t.style.getPropertyValue('--bw')), bwv = isNaN(bw) ? 1 : bw;
  const brd = bwv ? `\\brdrs\\brdrw${Math.max(5, Math.round(bwv * 15))}\\brdrcf${rtf_ci(rx, to_hex(t.style.getPropertyValue('--bc')) || '000000')}` : '\\brdrnil';
  let o = '';
  rows.forEach(r => {
    o += '\\trowd\\trgaph100\\trleft0' + (r.cells[0] && r.cells[0].hasAttribute('data-hdr') ? '\\trhdr' : ''); let x = 0;
    Array.from(r.cells).forEach(c => {
      x += col_w * (c.colSpan || 1); const bg = to_hex(c.style.backgroundColor), va = { middle: '\\clvertalc', bottom: '\\clvertalb' }[c.style.verticalAlign] || '';
      o += `${va}\\clbrdrt${brd}\\clbrdrl${brd}\\clbrdrb${brd}\\clbrdrr${brd}${bg ? `\\clcbpat${rtf_ci(rx, bg)}` : ''}\\cellx${x}`;
    });
    o += '\n';
    Array.from(r.cells).forEach(c => {
      const f = c.tagName === 'TH' || c.hasAttribute('data-hdr') ? { b: true } : {}, parts = [];
      c.childNodes.forEach(nd => {
        if (nd.nodeType === 1 && is_list(nd)) Array.from(nd.children).forEach(li => parts.push(rtf_esc('• ') + rtf_inline(rx, li, f)));
        else if (nd.nodeType === 1) parts.push(rtf_inline(rx, nd, f)); else if (nd.nodeType === 3 && nd.data.trim()) parts.push(rtf_esc(nd.data));
