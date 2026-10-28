/* editor/io_export/xlsx_parts.js: the Excel workbook's fixed styles (normal, bold shaded header, wrapped multi-line
   cells), the column letters and one worksheet's XML (frozen header row, fitted column widths, numbers as numbers). */
import { xesc } from './docx_runs.js';

export const XL_NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
export const XL_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
export const XL_PR = 'http://schemas.openxmlformats.org/package/2006/relationships';
export const XLSX_STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
  + '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>'
  + '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>'
  + '<fill><patternFill patternType="solid"><fgColor rgb="FFE8EAED"/><bgColor indexed="64"/></patternFill></fill></fills>'
  + '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
  + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
  + '<cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
  + '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>'
  + '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf></cellXfs>'
  + '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';

export const col_name = i => { let s = ''; i++; while (i > 0) { const r = (i - 1) % 26; s = String.fromCharCode(65 + r) + s; i = Math.floor((i - 1) / 26); } return s; };
const FROZEN = '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>';

export const sheet_xml = s => {
  const width = Math.max(1, ...s.rows.map(r => r.length));
  const longest = (r, c) => Math.max(0, ...String(r[c] ?? '').split('\n').map(l => l.length));
  const cw = Array.from({ length: width }, (_, c) => Math.min(60, Math.max(8, ...s.rows.slice(0, 500).map(r => longest(r, c))) + 2));
  let x = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="${XL_NS}">${s.hdr ? FROZEN : ''}`
    + `<cols>${cw.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>`;
  s.rows.forEach((r, ri) => {
