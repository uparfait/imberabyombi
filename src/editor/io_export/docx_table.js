/* editor/io_export/docx_table.js: Word tables (fixed layout: column widths from the colgroup, borders, cell padding,
   shading, spans, header row, alignment) and the block walker that turns a container's children into Word XML. */
import { clamp, to_hex, is_list, is_table, is_break } from '../core/index.js';
import { inline_xml, parse_pt } from './docx_runs.js';
import { p_pr_xml, para_xml, list_xml } from './docx_paras.js';

export function table_xml(t, ctx) {
  const rows = Array.from(t.rows); if (!rows.length) return '';
  const n = Math.max(1, ...rows.map(r => Array.from(r.cells).reduce((a, c) => a + (c.colSpan || 1), 0)));
  const wp = clamp(parseFloat(t.style.width) || 100, 10, 100), total = Math.round(ctx.content_tw * wp / 100), cg = t.querySelector(':scope > colgroup');
  const pct = cg && cg.children.length === n ? Array.from(cg.children).map(c => parseFloat(c.style.width) || 100 / n) : Array(n).fill(100 / n);
  const sum = pct.reduce((a, b) => a + b, 0), widths = pct.map(p => Math.round(total * p / sum));
  const bw = parseFloat(t.style.getPropertyValue('--bw')), bwv = isNaN(bw) ? 1 : bw, bc = to_hex(t.style.getPropertyValue('--bc')) || '000000';
  const minimal = t.getAttribute('data-style') === 'minimal';
  const bdr = s => bwv && !(minimal && /^(left|right|insideV)$/.test(s))
    ? `<w:${s} w:val="single" w:sz="${Math.max(2, Math.round(bwv * 6))}" w:space="0" w:color="${bc}"/>` : `<w:${s} w:val="nil"/>`;
  const pad_pt = parse_pt(t.style.getPropertyValue('--pad').trim()), pad = Math.round((pad_pt == null ? 5 : pad_pt) * 20);
  const jc = t.style.marginLeft === 'auto' ? (t.style.marginRight === 'auto' ? 'center' : 'right') : '';
  let out = `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/>${jc ? `<w:jc w:val="${jc}"/>` : ''}`
    + `<w:tblBorders>${['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(bdr).join('')}</w:tblBorders><w:tblLayout w:type="fixed"/>`
    + `<w:tblCellMar><w:top w:w="${pad}" w:type="dxa"/><w:left w:w="${pad}" w:type="dxa"/><w:bottom w:w="${pad}" w:type="dxa"/>`
    + `<w:right w:w="${pad}" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map(w => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
  rows.forEach((r, ri) => {
    const hdr_row = ri === 0 && Array.from(r.cells).some(c => c.hasAttribute('data-hdr') || c.tagName === 'TH');
    out += `<w:tr>${hdr_row ? '<w:trPr><w:tblHeader/></w:trPr>' : ''}`; let col = 0;
