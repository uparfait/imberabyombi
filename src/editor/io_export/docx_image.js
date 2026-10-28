/* editor/io_export/docx_image.js: Word pictures (in line, or wrapped left / right with their border), prepare_images
   (natural sizes; linked images redrawn as PNG data, unreadable ones dropped) and the list numbering definitions. */
import { qsa, to_hex } from '../core/index.js';
import { b64bytes } from '../io_import/index.js';
import { xesc } from './docx_runs.js';
import { NUMFMT } from './docx_paras.js';

const EMU = 9525;   /* one CSS pixel in English Metric Units */
export function image_xml(img, ctx) {
  if (!ctx.add_media) return '';
  const m = (img.getAttribute('src') || '').match(/^data:image\/(png|jpe?g|gif);base64,(.*)$/i); if (!m) return '';
  const ext = m[1].toLowerCase() === 'jpg' ? 'jpeg' : m[1].toLowerCase(), bytes = b64bytes(m[2]);
  const nw = +img.dataset.nw || 300, nh = +img.dataset.nh || 200;
  let w = parseFloat(img.style.width) || parseFloat(img.getAttribute('width')) || nw; w = Math.min(w, ctx.content_px);
  const h = parseFloat(img.style.height) || w * nh / nw, cx = Math.round(w * EMU), cy = Math.round(h * EMU);
  const { rid, n } = ctx.add_media(bytes, ext), alt = xesc(img.getAttribute('alt') || '');
  const bw = parseFloat(img.style.borderWidth) || 0;
  const ln = bw ? `<a:ln w="${Math.round(bw * EMU)}"><a:solidFill><a:srgbClr val="${to_hex(img.style.borderColor) || '000000'}"/></a:solidFill></a:ln>` : '';
  const graphic = '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr>'
    + `<pic:cNvPr id="${n}" name="image${n}.${ext}" descr="${alt}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/>`
    + `<a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>`
    + `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${ln}</pic:spPr></pic:pic></a:graphicData></a:graphic>`;
  const pos = ({ wrap_left: 'left', wrap_right: 'right' })[img.getAttribute('data-pos')], doc_pr = `<wp:docPr id="${n}" name="Picture ${n}" descr="${alt}"/>`;
  if (pos === 'left' || pos === 'right') {
    return `<w:r><w:drawing><wp:anchor distT="0" distB="91440" distL="${pos === 'right' ? 182880 : 0}" distR="${pos === 'left' ? 182880 : 0}" simplePos="0" `
      + `relativeHeight="${251658240 + n}" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/>`
      + `<wp:positionH relativeFrom="column"><wp:align>${pos}</wp:align></wp:positionH><wp:positionV relativeFrom="paragraph"><wp:posOffset>0</wp:posOffset>`
      + `</wp:positionV><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapSquare wrapText="bothSides"/>`
      + `${doc_pr}<wp:cNvGraphicFramePr/>${graphic}</wp:anchor></w:drawing></w:r>`;
  }
  return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/>${doc_pr}${graphic}</wp:inline></w:drawing></w:r>`;
}
export async function prepare_images(root) {
  for (const img of qsa('img', root)) {
    const src = img.getAttribute('src') || ''; const im = new Image(); im.crossOrigin = 'anonymous'; im.src = src;
    try { await im.decode(); } catch (e) { img.remove(); continue; }
    img.dataset.nw = im.naturalWidth; img.dataset.nh = im.naturalHeight;
    if (!/^data:image\/(png|jpe?g|gif);base64,/i.test(src)) {
      try {
        const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0);
        img.setAttribute('src', c.toDataURL('image/png'));
