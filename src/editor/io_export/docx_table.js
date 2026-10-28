/* editor/io_export/docx_table.js: Word tables (fixed layout: column widths from the colgroup, borders, cell padding,
   shading, spans, header row, alignment) and the block walker that turns a container's children into Word XML. */
import { clamp, to_hex, is_list, is_table, is_break } from '../core/index.js';
import { inline_xml, parse_pt } from './docx_runs.js';
