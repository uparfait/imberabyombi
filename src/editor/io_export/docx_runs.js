/* editor/io_export/docx_runs.js: Word runs: XML escaping, the namespaces, the formatting an element adds (fmt_of, shared
   with the Rich Text writer), run properties, text runs (tabs, line breaks) and inline content with links and images. */
import { is_list, is_table, to_hex } from '../core/index.js';
import { image_xml } from './docx_image.js';

export const xesc = s => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const RELNS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
export const WNS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
  + 'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
  + 'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
export function parse_pt(v) {
  if (!v) return null; const n = parseFloat(v); if (isNaN(n)) return null;
  if (/pt$/.test(v)) return n; if (/px$/.test(v)) return n * 0.75; if (/em$/.test(v)) return n * 11; return null;
}
/* f: the formatting so far ({ b, i, u, s, sup, sub, font, size, color, hl, link }); returns it plus what element e adds */
export function fmt_of(e, f) {
  const g = Object.assign({}, f), t = e.tagName, st = e.style;
  if (t === 'B' || t === 'STRONG') g.b = true; if (t === 'I' || t === 'EM') g.i = true; if (t === 'U' || t === 'INS') g.u = true;
  if (t === 'S' || t === 'STRIKE' || t === 'DEL') g.s = true; if (t === 'SUP') g.sup = true; if (t === 'SUB') g.sub = true;
  if (t === 'CODE') g.font = 'Courier New'; if (t === 'MARK') g.hl = 'FFFF00';
  if (t === 'FONT') {
