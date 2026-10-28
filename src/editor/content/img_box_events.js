/* editor/content/img_box_events.js: the selection box's listeners: resize from the corner handles (every position; an
   absolute image keeps its opposite corner still), drag to move from the move area, the quick bar (click; hovering a
   position / alignment button previews it live), and the box's context menu (all image options). */
import { clamp, state, live, is_abs, begin_op, end_op, body_index } from '../core/index.js';
import { open_menu } from '../ui/index.js';
import { ensure_img_box, img_sel, img_max, select_image, hide_img_sel, position_img_box, freeze_img_box, img_now } from './img_sel.js';
