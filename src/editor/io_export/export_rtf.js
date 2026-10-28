/* editor/io_export/export_rtf.js: Rich Text (.rtf) for WordPad and older editors: paragraphs, lists (marks + tab),
   tables (borders, shading, header rows), page breaks, rules, PNG / JPEG pictures, links; the paper size and margins. */
import { state, dims, download, is_list, is_table, is_break, to_hex } from '../core/index.js';
