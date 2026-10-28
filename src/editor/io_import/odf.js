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
