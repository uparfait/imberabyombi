/* editor/io_import/docx.js: Word → HTML. mammoth (loaded on first use from the CDN) first; if it cannot be loaded or
   gives nothing, the built-in reader (docx_native): headings, title / subtitle, quotes, alignment, nested bullet /
   numbered lists, tables (spans, cell colours), content controls, page breaks, images, links. */
import { load_script, LIB } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids, rels_of } from './xml_helpers.js';
import { docx_val as val, docx_runs } from './docx_runs.js';
import { PB } from './pptx.js';

export async function docx_to_html(file) {
  const buf = await file.arrayBuffer();
  try {
    await load_script(LIB.mammoth);
    const res = await window.mammoth.convertToHtml({ arrayBuffer: buf.slice(0) },
      { styleMap: ["p[style-name='Title'] => p.title:fresh", "p[style-name='Subtitle'] => p.subtitle:fresh"] });
    if (res.value && res.value.trim()) return { html: res.value };
  } catch (e) { console.warn('Using the built-in Word reader', e); }
  return { html: await docx_native(buf) };
}
export async function docx_native(buf) {
  const z = await unzip(buf), doc = parse_xml(await z.text('word/document.xml'));
  const rels = rels_of(z.has('word/_rels/document.xml.rels') ? await z.text('word/_rels/document.xml.rels') : ''), num_fmt = {};
  if (z.has('word/numbering.xml')) {
    const nd = parse_xml(await z.text('word/numbering.xml')), abs = {};
    by_tag(nd, 'abstractNum').forEach(a => { const f = by_tag(a, 'numFmt')[0]; abs[a.getAttribute('w:abstractNumId')] = f ? f.getAttribute('w:val') : 'bullet'; });
    by_tag(nd, 'num').forEach(n => { const a = by_tag(n, 'abstractNumId')[0]; num_fmt[n.getAttribute('w:numId')] = a ? abs[a.getAttribute('w:val')] : 'bullet'; });
  }
  const out = document.createElement('div'); await docx_blocks({ z, rels, num_fmt }, kids(by_tag(doc, 'body')[0]), out);
  return out.innerHTML || '<p><br></p>';
}

const JCM = { center: 'center', right: 'right', end: 'right', both: 'justify', distribute: 'justify' };
const HEX6 = /^[0-9a-f]{6}$/i;
async function docx_blocks(cx, nodes, container) {
  let stack = [];
  const add_li = (li, lvl, tag) => {
    while (stack.length > lvl + 1) stack.pop();
    if (stack.length === lvl + 1 && stack[lvl].tagName !== tag) stack.pop();
    while (stack.length < lvl + 1) {
      const l = document.createElement(tag);
      if (!stack.length) container.appendChild(l);
      else {
        const par = stack[stack.length - 1]; let host = par.lastElementChild;
        if (!host) { host = document.createElement('li'); par.appendChild(host); } host.appendChild(l);
      }
      stack.push(l);
    }
    stack[lvl].appendChild(li);
  };
  const page_break = () => container.insertAdjacentHTML('beforeend', PB);
  for (const n of nodes) {
    const ln = n.localName;
