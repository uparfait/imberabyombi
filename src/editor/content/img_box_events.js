/* editor/content/img_box_events.js: the selection box's listeners: resize from the corner handles (every position; an
   absolute image keeps its opposite corner still), drag to move from the move area, the quick bar (click; hovering a
   position / alignment button previews it live), and the box's context menu (all image options). */
import { clamp, state, live, is_abs, begin_op, end_op, body_index } from '../core/index.js';
import { open_menu } from '../ui/index.js';
import { ensure_img_box, img_sel, img_max, select_image, hide_img_sel, position_img_box, freeze_img_box, img_now } from './img_sel.js';
import { set_img_pos, set_img_align } from './img_pos.js';
import { image_menu_items } from './img_menu.js';
import { start_img_drag } from './img_drag.js';

function resize(e, h) {
  e.preventDefault(); e.stopPropagation();
  const img = img_sel, sx = e.clientX, sw = img.offsetWidth, sh = img.offsetHeight, max_w = img_max(img), c = h.dataset.c, sign = c.includes('e') ? 1 : -1;
  const abs = is_abs(img), l0 = img.offsetLeft, t0 = img.offsetTop;
  begin_op();
  const move = ev => {
    const w = clamp(Math.round(sw + (ev.clientX - sx) / state.zoom * sign), 16, max_w);
    img.style.width = w + 'px'; img.style.height = ''; img.removeAttribute('width'); img.removeAttribute('height');
    if (abs) { if (sign < 0) img.style.left = Math.round(l0 + sw - w) + 'px'; if (c.includes('n')) img.style.top = Math.round(t0 + sh - img.offsetHeight) + 'px'; }
    position_img_box();
  };
  const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); end_op(body_index(img.closest('.pg_body'))); select_image(img); };
  addEventListener('pointermove', move); addEventListener('pointerup', up);
}
const on_mousedown = e => e.preventDefault();
