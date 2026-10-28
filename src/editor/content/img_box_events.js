/* editor/content/img_box_events.js: the selection box's listeners: resize from the corner handles (every position; an
   absolute image keeps its opposite corner still), drag to move from the move area, the quick bar (click; hovering a
   position / alignment button previews it live; the alt text button opens its dialog), and the box's context menu (all
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
function on_pointerdown(e) {
  if (!img_sel) return;
  const h = e.target.closest('.h'); if (h) { resize(e, h); return; }
  if (e.target.closest('.img_move')) start_img_drag(e, img_sel, true);
}

/* quick bar hover preview: the box stays put while the pointer is on the bar (a preview may move the image) */
let hover_b = null, hover_img = null, hover_fn = null;
const run = (img, a) => { const [k, v] = a.split(':'); if (k === 'pos') set_img_pos(img, v); else set_img_align(img, v); };
function settle(kept) {
  freeze_img_box(false); const img = kept && img_sel?.isConnected ? img_sel : img_now(hover_img); hover_b = hover_img = hover_fn = null;
  if (img?.isConnected) select_image(img); else hide_img_sel();
}
function on_over(e) {
  const b = e.target.closest('[data-a]'); if (b === hover_b) return;
  if (hover_b) { live.cancel(); settle(false); }
  if (!b || !img_sel || e.pointerType !== 'mouse' || !/^(pos|align):/.test(b.dataset.a)) return;
  hover_b = b; hover_img = img_sel; freeze_img_box(true); const img = img_sel;
  hover_fn = () => run(img, b.dataset.a); live.preview(hover_fn);
}
function on_out(e) { if (hover_b && !hover_b.contains(e.relatedTarget)) { live.cancel(); settle(false); } }
function on_click(e) {
  const b = e.target.closest('[data-a]'); if (!b || !img_sel) return;
  if (b === hover_b) { live.keep(hover_fn); settle(true); return; }
  if (b.dataset.a === 'more') open_menu(b, image_menu_items(img_sel)); else run(img_sel, b.dataset.a);
}
function on_ctx(e) { if (!img_sel) return; e.preventDefault(); e.stopPropagation(); open_menu(null, image_menu_items(img_sel), { x: e.clientX, y: e.clientY }); }

const EVENTS = [['mousedown', on_mousedown], ['pointerdown', on_pointerdown], ['pointerover', on_over], ['pointerout', on_out], ['click', on_click], ['contextmenu', on_ctx]];
export function install_img_box() {
  const box = ensure_img_box();
  EVENTS.forEach(([k, f]) => box.addEventListener(k, f));
  return () => { if (hover_b) { live.cancel(); settle(false); } hide_img_sel(); EVENTS.forEach(([k, f]) => box.removeEventListener(k, f)); };
}
