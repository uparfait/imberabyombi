/* editor/io_import/docx.js: Word → HTML. The built-in reader (docx_native) first: headings, title / subtitle, quotes,
   alignment, nested bullet / numbered lists, tables (spans, cell colours), content controls, page breaks, images, links,
   and the text's colours, fonts, sizes and highlights; it needs no download. If it fails or finds nothing, mammoth (loaded
   on first use from the CDN), which keeps the structure but not those styles. */
import { load_script, LIB } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids, rels_of } from './xml_helpers.js';
import { docx_val as val, docx_runs } from './docx_runs.js';
import { PB } from './pptx.js';

export async function docx_to_html(file) {
  const buf = await file.arrayBuffer();
  try { const html = await docx_native(buf.slice(0)); if (html && html.trim()) return { html }; }
  catch (e) { console.warn('Trying mammoth for this Word file', e); }
  await load_script(LIB.mammoth);
  const res = await window.mammoth.convertToHtml({ arrayBuffer: buf.slice(0) },
    { styleMap: ["p[style-name='Title'] => p.title:fresh", "p[style-name='Subtitle'] => p.subtitle:fresh"] });
  return { html: res.value || '' };
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
    if (ln === 'p') {
      const pr = kids(n, 'pPr')[0], style = val(pr && kids(pr, 'pStyle')[0]) || '', num_pr = pr && kids(pr, 'numPr')[0];
      let html = await docx_runs(cx, n); const pb = html.includes('\u0001'); html = html.replace(/\u0001/g, '');
      const jc = JCM[val(pr && kids(pr, 'jc')[0])], attrs = jc ? ` style="text-align:${jc}"` : '';
      const num_id = num_pr && val(kids(num_pr, 'numId')[0]);
      if (num_id && num_id !== '0') {
        const li = document.createElement('li'); li.innerHTML = html || '<br>';
        add_li(li, Math.min(+(val(kids(num_pr, 'ilvl')[0]) || 0), 6), (cx.num_fmt[num_id] || 'bullet') === 'bullet' ? 'UL' : 'OL');
        if (pb) { stack = []; page_break(); } continue;
      }
      stack = [];
      let tag = 'p', cls = ''; const hm = /heading\s*([1-6])/i.exec(style);
      if (hm) tag = 'h' + hm[1]; else if (/^title$/i.test(style)) cls = 'title'; else if (/^subtitle$/i.test(style)) cls = 'subtitle';
      else if (/quote/i.test(style)) tag = 'blockquote';
      container.insertAdjacentHTML('beforeend', `<${tag}${cls ? ` class="${cls}"` : ''}${attrs}>${html || '<br>'}</${tag}>`);
      if (pb) page_break();
    } else if (ln === 'tbl') {
      stack = [];
      const t = document.createElement('table'); t.className = 'doc_table'; const tb = document.createElement('tbody'); t.appendChild(tb);
      for (const tr of kids(n, 'tr')) {
        const row = document.createElement('tr');
        for (const tc of kids(tr, 'tc')) {
          const td = document.createElement('td'), tc_pr = kids(tc, 'tcPr')[0], span = +(val(tc_pr && kids(tc_pr, 'gridSpan')[0]) || 1);
          const shd = tc_pr && kids(tc_pr, 'shd')[0], fill = shd && shd.getAttribute('w:fill');
          if (span > 1) td.colSpan = span; if (fill && HEX6.test(fill) && fill.toUpperCase() !== 'FFFFFF') td.style.backgroundColor = '#' + fill;
          await docx_blocks(cx, kids(tc).filter(x => x.localName === 'p' || x.localName === 'tbl'), td); if (!td.firstChild) td.innerHTML = '<p><br></p>';
          row.appendChild(td);
        }
        tb.appendChild(row);
      }
      container.appendChild(t);
    } else if (ln === 'sdt') { const sc = kids(n, 'sdtContent')[0]; if (sc) await docx_blocks(cx, kids(sc), container); }
  }
}
