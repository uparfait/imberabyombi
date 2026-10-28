/* editor/io_export/export_rtf.js: Rich Text (.rtf) for WordPad and older editors: paragraphs, lists (marks + tab),
   tables (borders, shading, header rows), page breaks, rules, PNG / JPEG pictures, links; the paper size and margins. */
import { state, dims, download, is_list, is_table, is_break, to_hex } from '../core/index.js';
import { RTF_P, rtf_ci, rtf_esc, rtf_inline, rtf_para } from './rtf_parts.js';
import { prepare_images } from './docx_image.js';

function rtf_list(rx, l, lvl) {
  let o = '', k = parseInt(l.getAttribute('start')) || 1; const kind = l.classList.contains('checklist') ? 'check' : l.tagName === 'OL' ? 'num' : 'bul';
  Array.from(l.children).forEach(li => {
