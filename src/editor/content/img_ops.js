/* editor/content/img_ops.js: image edits as one undo step (img_op): width, border, rotate / flip (bake_image redraws
   the picture on a canvas), reset. All run inside live.preview(fn) as well (core keeps previews out of the history and
   holds their toasts); an image that a preview restore replaced is found again (img_now). */
import { clamp, toast, begin_op, end_op, body_index } from '../core/index.js';
import { can_edit, previewing } from '../format/index.js';
import { img_max, select_image, img_now } from './img_sel.js';

/* fn(img) gets the image as it is in the document now */
export function img_op(img, fn) {
  img = img_now(img); if (!img || !can_edit() || !img.isConnected) return;
  const body = img.closest('.pg_body'); begin_op(); fn(img); end_op(body ? body_index(body) : 0);
