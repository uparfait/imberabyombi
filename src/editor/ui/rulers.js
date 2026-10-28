/* editor/ui/rulers.js: the rulers (source "rulers"): an SVG scale in inches over the first page (horizontal) and beside
   the page in view (vertical), the margins shaded, and handles that drag a margin (sixteenths of an inch; the value shows
   next to the pointer while dragging; one history step when let go). Lengths along the page are page units
   (inches × 96 × zoom); the ruler's own thickness, ticks and handles scale with the root font (u()). */
import { state, hruler, vruler, scroller, DPI, dims, page_wraps, layout_page, clamp, begin_op, commit, save_soon } from '../core/index.js';
import { tip } from '../../overlays/index.js';
import { apply_setup } from './view.js';
import { scaled } from './ui_dom.js';

const u = n => +scaled(n).toFixed(2);

export function update_rulers() {
  if (!hruler || !vruler) return;
  hruler.style.display = state.show_ruler ? '' : 'none';
  vruler.style.display = state.show_ruler && !state.setup.pageless ? '' : 'none';
  if (!state.show_ruler) return;
  draw_h_ruler(); draw_v_ruler();
}
export function ruler_ticks(len, start, horiz, z) {
  let s = ''; const from = Math.ceil(-start * 8), to = Math.floor((len - start) * 8), b = u(17);
  for (let k = from; k <= to; k++) {
    const p = (start + k / 8) * DPI * z;
    if (k % 8 === 0) {
      if (k) s += horiz ? `<text class="r_text" x="${p}" y="${u(16)}" text-anchor="middle">${Math.abs(k / 8)}</text>`
        : `<text class="r_text" x="0" y="0" text-anchor="middle" transform="translate(${u(13)} ${p}) rotate(-90)">${Math.abs(k / 8)}</text>`;
    } else {
      const l = k % 4 === 0 ? 7 : (z >= 0.75 || k % 2 === 0) ? 3 : 0;
