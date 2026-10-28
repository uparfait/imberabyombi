/* editor/io_export/docx_runs.js: Word runs: XML escaping, the namespaces, the formatting an element adds (fmt_of, shared
   with the Rich Text writer), run properties, text runs (tabs, line breaks) and inline content with links and images. */
import { is_list, is_table, to_hex } from '../core/index.js';
import { image_xml } from './docx_image.js';

export const xesc = s => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const RELNS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
export const WNS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
