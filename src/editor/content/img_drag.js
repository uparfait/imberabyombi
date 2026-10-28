/* editor/content/img_drag.js: drag an image to MOVE it (pointer events: mouse, pen and touch; never a copy). Front /
   behind images follow the pointer (left / top, kept on their page; Shift keeps a straight line). In-flow images show a
   drop caret (.img_drop_caret) and on release the same node moves there. Esc cancels. One undo step per move. */
import { rem } from '../../lib/index.js';
import { el, clamp, state, is_abs, editable_of, caret_rect, set_caret, begin_op, end_op, body_index } from '../core/index.js';
import { img_box, select_image, hide_img_sel, position_img_box, pos_of } from './img_sel.js';
import { drop_point, place_at, anchor_abs } from './img_pos.js';

let drag = null, caret_el = null, swallow_until = 0;
/* true once right after a drag (or a cancelled one): the click that follows the release is not a click */
export const take_drag_click = () => { const s = Date.now() < swallow_until; swallow_until = 0; return s; };
const swallow = () => { swallow_until = Date.now() + 400; };

function show_caret(p) {
  const r = document.createRange(); try { r.setStart(p.node, p.off); } catch (e) { hide_caret(); return; } r.collapse(true);
  const rc = caret_rect(r), page = editable_of(p.node).closest('.page'), pr = page.getBoundingClientRect(), z = state.zoom;
  caret_el = caret_el || el('div', { class: 'img_drop_caret', style: 'position:absolute;width:0.125rem;pointer-events:none;z-index:6;background:rgb(var(--brand))' });
  if (caret_el.parentNode !== page) page.appendChild(caret_el);
  Object.assign(caret_el.style, { left: (rc.left - pr.left) / z + 'px', top: (rc.top - pr.top) / z + 'px', height: clamp(rc.height / z, rem() * 0.75, rem() * 3.75) + 'px' });
}
function hide_caret() { if (caret_el) caret_el.remove(); }

/* e: the pointerdown (on the image or on the selection box's move area); through: a press on a selected Behind-text
   image that does not move places the caret in the text above it */
export function start_img_drag(e, img, through = false) {
  if (!img || e.button > 0 || state.mode !== 'edit' || drag) return;
  e.preventDefault(); e.stopPropagation(); swallow_until = 0;
  drag = { img, id: e.pointerId, abs: is_abs(img), sx: e.clientX, sy: e.clientY, l0: img.style.left, t0: img.style.top, x0: img.offsetLeft, y0: img.offsetTop,
    moved: false, p: null, through: through && pos_of(img) === 'behind' };
  addEventListener('pointermove', on_move); addEventListener('pointerup', on_up); addEventListener('pointercancel', cancel); addEventListener('keydown', on_key, true);
}
function on_move(ev) {
  const d = drag; if (!d || ev.pointerId !== d.id) return;
  let dx = ev.clientX - d.sx, dy = ev.clientY - d.sy; const z = state.zoom;
  if (!d.moved) {
    if (Math.hypot(dx, dy) < 4) return;
    d.moved = true; begin_op(); img_box?.classList.add('img_dragging'); document.body.classList.add('img_dragging');
  }
  ev.preventDefault();
  if (d.abs) {
    if (ev.shiftKey) { if (Math.abs(dx) > Math.abs(dy)) dy = 0; else dx = 0; }
    const body = d.img.closest('.pg_body'), page = body.closest('.page');
    d.img.style.left = Math.round(clamp(d.x0 + dx / z, -body.offsetLeft, page.offsetWidth - body.offsetLeft - d.img.offsetWidth)) + 'px';
    d.img.style.top = Math.round(clamp(d.y0 + dy / z, -body.offsetTop, page.offsetHeight - body.offsetTop - d.img.offsetHeight)) + 'px';
    position_img_box(); return;
  }
  if (img_box) img_box.style.transform = `translate(${dx / z}px, ${dy / z}px)`;
  d.p = drop_point(ev.clientX, ev.clientY, d.img); if (d.p) show_caret(d.p); else hide_caret();
}
function finish() {
  removeEventListener('pointermove', on_move); removeEventListener('pointerup', on_up);
  removeEventListener('pointercancel', cancel); removeEventListener('keydown', on_key, true);
  img_box?.classList.remove('img_dragging'); document.body.classList.remove('img_dragging'); hide_caret();
  const d = drag; drag = null; return d;
}
function on_up(ev) {
  if (!drag || ev.pointerId !== drag.id) return;
  const d = finish(), img = d.img; swallow();   // the press already selected the image: the click that follows is not a click
  if (!d.moved) { if (d.through) { hide_img_sel(); const p = drop_point(ev.clientX, ev.clientY, img); if (p) set_caret(p.node, p.off); } return; }
  const i0 = body_index(img.closest('.pg_body'));
  if (d.abs) anchor_abs(img); else if (d.p && img.isConnected) place_at(img, d.p);
  const i1 = body_index(img.closest('.pg_body'));
  end_op(Math.max(0, Math.min(i0, i1)), !d.abs);
  select_image(img); position_img_box();
}
/* Esc (or a cancelled touch): everything goes back as it was */
function cancel() {
  if (!drag) return; const d = finish(); swallow();
  if (d.abs) { d.img.style.left = d.l0; d.img.style.top = d.t0; }
