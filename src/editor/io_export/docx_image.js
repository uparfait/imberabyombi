/* editor/io_export/docx_image.js: Word pictures (in line, or wrapped left / right with their border), prepare_images
   (natural sizes; linked images redrawn as PNG data, unreadable ones dropped) and the list numbering definitions. */
import { qsa, to_hex } from '../core/index.js';
import { b64bytes } from '../io_import/index.js';
import { xesc } from './docx_runs.js';
import { NUMFMT } from './docx_paras.js';

const EMU = 9525;   /* one CSS pixel in English Metric Units */
export function image_xml(img, ctx) {
  if (!ctx.add_media) return '';
