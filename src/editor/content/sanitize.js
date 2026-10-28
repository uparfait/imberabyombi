/* editor/content/sanitize.js: sanitize pasted / imported HTML (sanitize_html). Keeps the document's own tags, classes,
   styles and attributes; drops scripts, frames, form controls and unsafe links. Class names written by the original
   editor (page-break, doc-table, file-chip) are read as their snake_case names (page_break, doc_table, file_chip), its
   image positions left / right as wrap_left / wrap_right. Front / behind images keep position, left, top, z-index. */
import { qsa, BLOCK_RE } from '../core/index.js';

/* sanitize pasted / imported HTML */
export const ALLOWED = new Set(('P H1 H2 H3 H4 H5 H6 UL OL LI TABLE THEAD TBODY TFOOT TR TD TH COLGROUP COL B STRONG I EM U S STRIKE DEL INS SUB SUP A IMG BR HR '
  + 'SPAN FONT BLOCKQUOTE PRE CODE DIV MARK SMALL').split(' '));
export const DROP = new Set('SCRIPT STYLE META LINK TITLE NOSCRIPT IFRAME OBJECT EMBED SVG CANVAS FORM INPUT BUTTON SELECT TEXTAREA HEAD VIDEO AUDIO TEMPLATE'.split(' '));
export const KEEP_CLS = new Set(['title', 'subtitle', 'checklist', 'page_break', 'cmt', 'doc_table', 'file_chip']);
export const KEEP_STYLE = ['color', 'background-color', 'font-weight', 'font-style', 'text-decoration', 'text-decoration-line', 'font-size', 'font-family',
  'text-align', 'line-height', 'margin-left', 'margin-right', 'vertical-align', 'width', 'list-style-type', 'padding-top', 'padding-bottom', 'border',
  'border-radius', 'box-shadow', 'height', '--bw', '--bc', '--pad'];
