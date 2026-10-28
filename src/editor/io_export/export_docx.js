/* editor/io_export/export_docx.js: Word (.docx) with no external library: the body (paragraphs, lists, tables, pictures,
   links), the page size and margins, the header and footer (with page numbers), the styles and the list numbering. */
import { state, dims, DPI, toast, download } from '../core/index.js';
import { xesc, RELNS, WNS } from './docx_runs.js';
