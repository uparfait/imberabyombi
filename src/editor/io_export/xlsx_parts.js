/* editor/io_export/xlsx_parts.js: the Excel workbook's fixed styles (normal, bold shaded header, wrapped multi-line
   cells), the column letters and one worksheet's XML (frozen header row, fitted column widths, numbers as numbers). */
import { xesc } from './docx_runs.js';

export const XL_NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
export const XL_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
