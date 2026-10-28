/* editor/content/sanitize.js: sanitize pasted / imported HTML (sanitize_html). Keeps the document's own tags, classes,
   styles and attributes; drops scripts, frames, form controls and unsafe links. Class names written by the original
   editor (page-break, doc-table, file-chip) are read as their snake_case names (page_break, doc_table, file_chip), its
   image positions left / right as wrap_left / wrap_right. Front / behind images keep position, left, top, z-index. */
import { qsa, BLOCK_RE } from '../core/index.js';
