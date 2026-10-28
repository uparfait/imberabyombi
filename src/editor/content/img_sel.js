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
  + '<div class="img_bar">' + BAR.map(b => b ? bar_btn(b) : '<span class="sep"></span>').join('')

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
  where.set(n, w); return n;
}

export const pos_of = img => img.getAttribute('data-pos') || 'inline';
export const img_max = img => (is_abs(img) ? img.closest('.pg_body') : img.closest('td,th') || img.closest('.pg_body')).clientWidth;
export function select_image(img) {
  if (state.mode !== 'edit' || !img) return;
  img_sel = img; img.setAttribute('draggable', 'false'); remember(img); position_img_box();
}
export function hide_img_sel() { if (frozen) return; img_sel = null; if (!img_box) return; img_box.style.display = 'none'; if (img_box.parentNode) img_box.remove(); }
export function img_align_of(img) {
  const pos = pos_of(img);
  if (pos === 'wrap_left' || pos === 'wrap_right') return pos.slice(5);
  if (pos === 'break') return img.getAttribute('data-align') || 'left';
  if (pos === 'front' || pos === 'behind') {
    const body = img.closest('.pg_body'); if (!body) return 'left';
    const room = body.clientWidth - img.offsetWidth, l = img.offsetLeft;
    return Math.abs(l - room / 2) < 2 ? 'center' : l >= room - 2 ? 'right' : 'left';
  }
  const blk = img.closest('p,h1,h2,h3,h4,h5,h6,li,td,th'), a = blk ? getComputedStyle(blk).textAlign : 'left';
  return a === 'center' ? 'center' : (a === 'right' || a === 'end') ? 'right' : 'left';
}
export function position_img_box() {
  if (!img_sel || frozen) return; if (!img_sel.isConnected) { hide_img_sel(); return; }
  const box = ensure_img_box(), page = img_sel.closest('.page'); if (box.parentNode !== page) page.appendChild(box);
  const { x, y } = offset_in(img_sel, page);
  Object.assign(box.style, { left: x + 'px', top: y + 'px', width: img_sel.offsetWidth + 'px', height: img_sel.offsetHeight + 'px', display: 'block', transform: '' });
  const bar = qs('.img_bar', box), pos = pos_of(img_sel), al = img_align_of(img_sel);
  qsa('[data-a]', bar).forEach(b => { const [k, v] = b.dataset.a.split(':'); b.classList.toggle('on', (k === 'pos' && v === pos) || (k === 'align' && v === al)); });
  qs('.sz', box).textContent = `${img_sel.offsetWidth} × ${img_sel.offsetHeight}px`;
  bar.style.left = '0px'; const over = x + bar.offsetWidth - page.offsetWidth + rem() / 2; if (over > 0) bar.style.left = -Math.min(over, x) + 'px';
}
