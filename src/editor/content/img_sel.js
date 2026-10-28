/* editor/content/img_sel.js: the image selection box (img_box, plain DOM the engine appends to the image's .page):
   four resize handles, a move area (drag to move), the quick bar (position, alignment, more options) and the size
   readout; select / hide / place it. img_now() finds an image again after a preview restore replaced the DOM. */
import { ic_html } from '../../icons/index.js';
import { rem } from '../../lib/index.js';
import { qs, qsa, el, state, is_abs, offset_in, bodies, body_index, path_to, node_at } from '../core/index.js';

/* data-pos values: inline (no attribute), wrap_left, wrap_right, break, front, behind (front / behind are absolute) */
export const IMG_POSITIONS = [['inline', 'In line', 'short_text'], ['wrap_left', 'Wrap text left', 'format_image_left'], ['wrap_right', 'Wrap text right', 'format_image_right'],
  ['break', 'Break text', 'view_agenda'], ['front', 'In front of text', 'flip_to_front'], ['behind', 'Behind text', 'flip_to_back']];
const BAR = [...IMG_POSITIONS.map(([v, l, i]) => ['pos:' + v, l, i]), null,
  ['align:left', 'Align left', 'format_align_left'], ['align:center', 'Align center', 'format_align_center'], ['align:right', 'Align right', 'format_align_right'], null,
  ['more', 'All image options', 'more_vert']];
const bar_btn = ([a, t, i]) => `<button type="button" data-a="${a}" data-tip="${t}" aria-label="${t}">${ic_html(i, 'h-[1.125rem] w-[1.125rem]')}</button>`;
const MOVE_CSS = 'position:absolute;inset:0;pointer-events:auto;touch-action:none;cursor:move';
const BOX_HTML = () => `<div class="img_move" style="${MOVE_CSS}"></div>`
