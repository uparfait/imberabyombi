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
      + `<Override PartName="/xl/workbook.xml" ContentType="${OX}.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="${OX}.styles+xml"/>`
      + `${sheets.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="${OX}.worksheet+xml"/>`).join('')}</Types>` },
    { name: '_rels/.rels', data: `${XML}<Relationships xmlns="${XL_PR}"><Relationship Id="rId1" Type="${XL_R}/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: 'xl/workbook.xml', data: `${XML}<workbook xmlns="${XL_NS}" xmlns:r="${XL_R}"><sheets>`
      + `${sheets.map((s, i) => `<sheet name="${xesc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', data: `${XML}<Relationships xmlns="${XL_PR}">`
      + `${sheets.map((s, i) => `<Relationship Id="rId${i + 1}" Type="${XL_R}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}`
      + `<Relationship Id="rId${sheets.length + 1}" Type="${XL_R}/styles" Target="styles.xml"/></Relationships>` },
    { name: 'xl/styles.xml', data: XLSX_STYLES },
    ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheet_xml(s) }))
