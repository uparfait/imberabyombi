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
    if (e.getAttribute('color')) g.color = to_hex(e.getAttribute('color'));
    if (e.getAttribute('face')) g.font = e.getAttribute('face').split(',')[0].replace(/["']/g, '').trim();
  }
  if (st) {
    if (st.fontWeight) g.b = /^(bold|bolder|[6-9]00)$/.test(st.fontWeight);
    if (st.fontStyle) g.i = st.fontStyle === 'italic';
    const td = st.textDecorationLine || st.textDecoration || ''; if (/underline/.test(td)) g.u = true; if (/line-through/.test(td)) g.s = true;
    if (st.color) g.color = to_hex(st.color) || g.color;
    if (st.backgroundColor) { const h = to_hex(st.backgroundColor); g.hl = h; }
    const pt = parse_pt(st.fontSize); if (pt) g.size = pt;
    if (st.fontFamily) g.font = st.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    if (st.verticalAlign === 'super') g.sup = true; if (st.verticalAlign === 'sub') g.sub = true;
  }
  return g;
}
export function r_pr(f) {
  let x = '';
  if (f.link) x += '<w:rStyle w:val="Hyperlink"/>';
  if (f.font) x += `<w:rFonts w:ascii="${xesc(f.font)}" w:hAnsi="${xesc(f.font)}" w:cs="${xesc(f.font)}"/>`;
  if (f.b) x += '<w:b/>'; if (f.i) x += '<w:i/>'; if (f.s) x += '<w:strike/>';
  if (f.color) x += `<w:color w:val="${f.color}"/>`;
  if (f.size) x += `<w:sz w:val="${Math.round(f.size * 2)}"/><w:szCs w:val="${Math.round(f.size * 2)}"/>`;
  if (f.u) x += '<w:u w:val="single"/>';
  if (f.hl) x += `<w:shd w:val="clear" w:color="auto" w:fill="${f.hl}"/>`;
  if (f.sup) x += '<w:vertAlign w:val="superscript"/>'; else if (f.sub) x += '<w:vertAlign w:val="subscript"/>';
  return x ? `<w:rPr>${x}</w:rPr>` : '';
}
export function text_runs(t, f) {
  let out = ''; const rp = r_pr(f);
  t.split(/(\t|\n)/).forEach(part => {
    if (part === '\t') out += `<w:r>${rp}<w:tab/></w:r>`; else if (part === '\n') out += `<w:r>${rp}<w:br/></w:r>`;
    else if (part) out += `<w:r>${rp}<w:t xml:space="preserve">${xesc(part)}</w:t></w:r>`;
  });
  return out;
}
/* ctx: { content_tw, content_px, add_link(href), add_media(bytes, ext), new_num(list) } (export_docx.js); headers and
   footers pass only the sizes, so their links stay text and their images are left out */
export function inline_xml(node, f, ctx) {
  let out = '';
  node.childNodes.forEach(n => {
    if (n.nodeType === 3) { out += text_runs(n.data.replace(/\u200b/g, ''), f); return; }
    if (n.nodeType !== 1) return;
    const t = n.tagName;
    if (t === 'BR') { if (n.nextSibling) out += `<w:r>${r_pr(f)}<w:br/></w:r>`; return; }
    if (t === 'IMG') { out += image_xml(n, ctx); return; }
    if (is_list(n) || is_table(n)) return;
    const g = fmt_of(n, f);
    if (t === 'A' && n.getAttribute('href') && !/^data:/i.test(n.getAttribute('href')) && ctx.add_link) {
      const rid = ctx.add_link(n.getAttribute('href'));
      out += `<w:hyperlink r:id="${rid}" w:history="1">${inline_xml(n, Object.assign({}, g, { link: true, color: null, u: false }), ctx)}</w:hyperlink>`; return;
