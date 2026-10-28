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
