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
