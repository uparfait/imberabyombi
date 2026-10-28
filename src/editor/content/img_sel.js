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
  + ['nw', 'ne', 'sw', 'se'].map(c => `<div class="h ${c}" data-c="${c}" style="touch-action:none"></div>`).join('')
  + '<div class="img_bar">' + BAR.map(b => b ? bar_btn(b) : '<span class="sep"></span>').join('') + '<span class="sz"></span></div>';

export let img_box = null;
export let img_sel = null;
/* the image a "Replace image › Upload from computer" is for (read by the #image_replace change listener) */
export let replace_target = null;
export const set_replace_target = img => { replace_target = img; };
/* the box is made on first use (never at module load) */
export const ensure_img_box = () => img_box || (img_box = el('div', { class: 'img_sel' }, BOX_HTML()));

/* While the pointer is on a quick-bar button its preview may move the image: the box stays where it is (frozen) */
let frozen = false;
export const freeze_img_box = on => { frozen = on; };

/* where each selected image sat (body index + node path), to find it again after a snapshot restore replaced it */
const where = new WeakMap();
function remember(img) { const b = img.closest('.pg_body'); if (b) where.set(img, { i: body_index(b), path: path_to(b, img) }); }
export function img_now(img) {
  if (!img || img.isConnected) return img;
  const w = where.get(img), b = w && w.path && bodies()[w.i], n = b && node_at(b, w.path);
  if (!n || n.tagName !== 'IMG') return img;
