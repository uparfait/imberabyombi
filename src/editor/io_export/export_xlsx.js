/* editor/io_export/export_xlsx.js: Excel (.xlsx): each table becomes its own worksheet, named after the heading above it
   (unique, at most 31 characters, no \ / ? * [ ] :). Written as Office Open XML with no external library. */
import { download } from '../core/index.js';
import { export_data } from './export_data.js';
import { xesc } from './docx_runs.js';
import { zip_store } from './zip_store.js';
import { XL_NS, XL_R, XL_PR, XLSX_STYLES, sheet_xml } from './xlsx_parts.js';

const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const OX = 'application/vnd.openxmlformats-officedocument.spreadsheetml';

export function export_xlsx(root, name) {
  const sheets = export_data(root), used = new Set();
  sheets.forEach(s => {
    let n = s.name.replace(/[\\/?*\[\]:]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31) || 'Sheet'; const b = n.slice(0, 26); let k = 2;
    while (used.has(n.toLowerCase())) n = `${b} (${k++})`; used.add(n.toLowerCase()); s.name = n;
  });
  const files = [
    { name: '[Content_Types].xml', data: `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">`
      + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'
