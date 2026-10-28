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
export const IMG_ONLY_STYLE = new Set(['border', 'border-radius', 'box-shadow', 'height']);
export const KEEP_ATTR = new Set(['colspan', 'rowspan', 'start', 'alt', 'width', 'color', 'face', 'data-cid', 'data-checked', 'data-strike', 'data-pos',
  'data-align', 'data-hdr', 'data-autobg', 'data-header', 'data-striped', 'data-style', 'download', 'title']);
/* an image in front of / behind the text keeps its place on the page (and the page it is on, data-page) */
const ABS_STYLE = ['position', 'left', 'top', 'z-index'];
/* data-pos of the original editor: left / right are now wrap_left / wrap_right */
const POS_OLD = { left: 'wrap_left', right: 'wrap_right' };
const abs_img = (c, tag) => tag === 'IMG' && /^(front|behind)$/.test(c.getAttribute('data-pos') || '');

/* the styles kept on one element */
function keep_style(c, tag) {
  const out = [];
  (abs_img(c, tag) ? [...KEEP_STYLE, ...ABS_STYLE] : KEEP_STYLE).forEach(p => {
    if (IMG_ONLY_STYLE.has(p) && tag !== 'IMG') return;
    if (p.startsWith('--') && tag !== 'TABLE') return;
    const val = c.style.getPropertyValue(p);
    if (val && !/expression|url\(/i.test(val)) out.push(`${p}:${val.trim()}`);
  });
  return out.join(';');
}

/* the attributes kept on one element (name → value) */
function keep_attrs(c, tag) {
  const keep = {}, orig_cls = c.getAttribute('class') || '';
  for (const a of Array.from(c.attributes)) {
    const n = a.name.toLowerCase(), v = a.value;
    if (n === 'style') { const s = keep_style(c, tag); if (s) keep.style = s; }
    else if (n === 'href' && tag === 'A') {
      if (!/^\s*(javascript|vbscript|data):/i.test(v) || (/\bfile[-_]chip\b/.test(orig_cls) && /^data:/i.test(v.trim()) && c.hasAttribute('download'))) keep.href = v;
    }
    else if (n === 'src' && tag === 'IMG') { if (/^(data:image\/|https?:|blob:)/i.test(v)) keep.src = v; }
    else if (n === 'data-orig' && tag === 'IMG') { if (/^data:image\//i.test(v)) keep[n] = v; }
    else if (n === 'data-pos') keep[n] = Object.hasOwn(POS_OLD, v) ? POS_OLD[v] : v;
    else if (n === 'data-page' && abs_img(c, tag)) keep[n] = v;
