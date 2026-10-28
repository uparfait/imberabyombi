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
