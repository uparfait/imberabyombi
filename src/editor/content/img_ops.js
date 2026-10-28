/* editor/content/img_ops.js: image edits as one undo step (img_op): width, border, rotate / flip (bake_image redraws
   the picture on a canvas), reset. All run inside live.preview(fn) as well (core keeps previews out of the history and
   holds their toasts); an image that a preview restore replaced is found again (img_now). */
import { clamp, toast, begin_op, end_op, body_index } from '../core/index.js';
