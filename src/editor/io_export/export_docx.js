/* editor/io_export/export_docx.js: Word (.docx) with no external library: the body (paragraphs, lists, tables, pictures,
   links), the page size and margins, the header and footer (with page numbers), the styles and the list numbering. */
import { state, dims, DPI, toast, download } from '../core/index.js';
import { xesc, RELNS, WNS } from './docx_runs.js';
import { list_kind } from './docx_paras.js';
import { blocks_xml } from './docx_table.js';
import { prepare_images, abstract_xml } from './docx_image.js';
import { DOCX_STYLES } from './docx_styles.js';
import { docx_types, DOCX_RELS, docx_core, docx_numbering, docx_doc_rels, docx_header, docx_footer } from './docx_parts.js';
import { zip_store } from './zip_store.js';

const tw = v => Math.round(v * 1440);   /* inches → twentieths of a point */
const sect_xml = (refs, win, hin, m) => `<w:sectPr>${refs}<w:pgSz w:w="${tw(win)}" w:h="${tw(hin)}"${win > hin ? ' w:orient="landscape"' : ''}/>`
