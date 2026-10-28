/* editor/io_import/sheets.js: spreadsheets → one heading + table per sheet. SheetJS (loaded on first use from the CDN)
   reads every format; if it cannot be loaded, .xlsx / .xlsm are read by the built-in reader (xlsx_native). */
import { load_script, LIB, esc_html } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, resolve_path, rels_of } from './xml_helpers.js';
import { rows_to_table, trim_rows } from './tables.js';

const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
/* "AB12" → 27 (0-based column) */
export function col_idx(ref) { const m = /^([A-Z]+)/i.exec(ref); let n = 0; if (m) for (const ch of m[1].toUpperCase()) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; }
/* one cell's shown value: shared string, inline string, boolean or the stored value */
function cell_value(c, strings) {
  const t = c.getAttribute('t'), v = by_tag(c, 'v')[0]; let val = v ? v.textContent : '';
  if (t === 's') val = strings[+val] || '';
  else if (t === 'inlineStr') val = by_tag(c, 't').map(x => x.textContent).join('');
  else if (t === 'b') val = val === '1' ? 'TRUE' : 'FALSE';
  return val;
}
export async function xlsx_native(buf) {
  const z = await unzip(buf);
  const strings = z.has('xl/sharedStrings.xml') ? by_tag(parse_xml(await z.text('xl/sharedStrings.xml')), 'si').map(si => by_tag(si, 't').map(t => t.textContent).join('')) : [];
  const wb = parse_xml(await z.text('xl/workbook.xml')), rels = rels_of(z.has('xl/_rels/workbook.xml.rels') ? await z.text('xl/_rels/workbook.xml.rels') : '');
  const out = [];
  for (const s of by_tag(wb, 'sheet')) {
    const r = rels[s.getAttribute('r:id') || s.getAttributeNS(R_NS, 'id')]; if (!r) continue;
    const path = r.target.startsWith('/') ? r.target.slice(1) : resolve_path('xl/', r.target), rows = [];
    if (z.has(path)) by_tag(parse_xml(await z.text(path)), 'row').forEach(row => {
      const ri = (parseInt(row.getAttribute('r')) || rows.length + 1) - 1; if (ri >= 2000) return; const arr = rows[ri] = rows[ri] || [];
      by_tag(row, 'c').forEach((c, k) => { const ref = c.getAttribute('r'), ci = ref ? col_idx(ref) : k; if (ci >= 40) return; arr[ci] = cell_value(c, strings); });
    });
    out.push({ name: s.getAttribute('name') || 'Sheet', rows: Array.from(rows, r => r || []) });
  }
  return out;
}
export async function sheet_to_html(file, ext) {
  const buf = await file.arrayBuffer(); let sheets;
  try {
    await load_script(LIB.xlsx); const wb = window.XLSX.read(new Uint8Array(buf), { type: 'array', cellDates: true });
