/* editor/content/img_drag.js: drag an image to MOVE it (pointer events: mouse, pen and touch; never a copy). Front /
   behind images follow the pointer (left / top, kept on their page; Shift keeps a straight line). In-flow images show a
   drop caret (.img_drop_caret) and on release the same node moves there. Esc cancels. One undo step per move. */
import { rem } from '../../lib/index.js';
import { el, clamp, state, is_abs, editable_of, caret_rect, set_caret, begin_op, end_op, body_index } from '../core/index.js';
import { img_box, select_image, hide_img_sel, position_img_box, pos_of } from './img_sel.js';
import { drop_point, place_at, anchor_abs } from './img_pos.js';

let drag = null, caret_el = null, swallow_until = 0;
/* true once right after a drag (or a cancelled one): the click that follows the release is not a click */
