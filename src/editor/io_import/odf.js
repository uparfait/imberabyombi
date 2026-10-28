/* editor/io_import/odf.js: OpenDocument text / presentation → HTML: headings, paragraphs, styled spans (bold, italic,
   underline, colour), links, lists, tables (column spans), frames (text boxes, images), slides (page break + heading).
   cx = { z (the unzipped file), sty (text styles by name) }. */
import { esc_html, clamp } from '../core/index.js';
import { unzip } from './unzip.js';
import { parse_xml, by_tag, kids } from './xml_helpers.js';
import { PB } from './pptx.js';

/* a frame's image, as wide as the frame (cm / mm / in / pt → px, 16–650) */
async function odf_img(cx, fr) {
  const im = by_tag(fr, 'image')[0], href = im && im.getAttribute('xlink:href'); if (!href || !cx.z.has(href)) return '';
  const url = await cx.z.data_url(href); if (!url) return '';
  const sw = fr.getAttribute('svg:width') || '', w = parseFloat(sw) || 0, u = sw.replace(/[\d.]/g, '');
  const px = u === 'cm' ? w * 37.8 : u === 'mm' ? w * 3.78 : u === 'in' ? w * 96 : u === 'pt' ? w * 4 / 3 : 300;
  return `<img src="${url}" alt="" style="width:${clamp(Math.round(px), 16, 650)}px">`;
}
async function odf_inline(cx, n) {
  let h = '';
  for (const c of Array.from(n.childNodes)) {
    if (c.nodeType === 3) { h += esc_html(c.data); continue; } if (c.nodeType !== 1) continue;
    const ln = c.localName;
    if (ln === 's') h += ' '.repeat(+(c.getAttribute('text:c') || 1)); else if (ln === 'tab') h += '\t'; else if (ln === 'line-break') h += '<br>';
    else if (ln === 'a') h += `<a href="${esc_html(c.getAttribute('xlink:href') || '')}">${await odf_inline(cx, c)}</a>`;
    else if (ln === 'frame') h += await odf_img(cx, c);
    else if (ln === 'note' || ln === 'annotation') continue;
    else if (ln === 'span') {
      const s = cx.sty[c.getAttribute('text:style-name')] || {}; let x = await odf_inline(cx, c);
      if (s.b) x = `<b>${x}</b>`; if (s.i) x = `<i>${x}</i>`; if (s.u) x = `<u>${x}</u>`; if (s.color && s.color !== '#000000') x = `<span style="color:${s.color}">${x}</span>`;
      h += x;
    }
    else h += await odf_inline(cx, c);
  }
  return h;
}
/* the rows of table t itself (not those of tables nested in its cells) */
const own_rows = t => by_tag(t, 'table-row').filter(r => { let p = r.parentNode; while (p && p.localName !== 'table') p = p.parentNode; return p === t; });
