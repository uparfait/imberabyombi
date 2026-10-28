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
      if (l) s += horiz ? `<line class="r_tick" x1="${p}" x2="${p}" y1="${u(17 - l)}" y2="${b}"/>` : `<line class="r_tick" y1="${p}" y2="${p}" x1="${u(17 - l)}" x2="${b}"/>`;
    }
  }
  return s;
}
export function draw_h_ruler() {
  const w0 = page_wraps()[0]; if (!w0 || !hruler) return;
  const { win } = dims(), z = state.zoom, m = state.setup.margins, W = win * DPI * z;
  const left = w0.getBoundingClientRect().left - hruler.getBoundingClientRect().left;
  const lx = m.left * DPI * z, rx = (win - m.right) * DPI * z, y = u(3), h = u(18);
  const tri = `<path d="M${-u(6)} ${u(7)} L${u(6)} ${u(7)} L0 ${u(14)} Z"/><rect x="${-u(8)}" y="0" width="${u(16)}" height="${u(22)}" fill="transparent"/>`;
  hruler.innerHTML = `<svg width="${W}" height="${u(24)}" style="position:absolute;left:${left}px;top:0;overflow:visible"><rect class="r_bg" x="0" y="${y}" width="${W}" height="${h}"/>`
    + `<rect class="r_margin" x="0" y="${y}" width="${lx}" height="${h}"/><rect class="r_margin" x="${rx}" y="${y}" width="${W - rx}" height="${h}"/>${ruler_ticks(win, m.left, true, z)}`
    + `<g class="r_handle" data-handle="left" transform="translate(${lx} 0)"><rect class="knob" x="${-u(6)}" y="${u(1)}" width="${u(12)}" height="${u(4)}" rx="${u(1)}"/>${tri}</g>`
    + `<g class="r_handle" data-handle="right" transform="translate(${rx} 0)">${tri}</g></svg>`;
}
export function draw_v_ruler() {
  if (state.setup.pageless || !vruler || !scroller) return;
  const ws = page_wraps(), sr = scroller.getBoundingClientRect();
  const target = ws.find(w => w.getBoundingClientRect().bottom > sr.top + scaled(40)) || ws[0]; if (!target) return;
  const { hin } = dims(), z = state.zoom, m = state.setup.margins, H = hin * DPI * z;
  const top = target.getBoundingClientRect().top - vruler.getBoundingClientRect().top;
  const ty = m.top * DPI * z, by = (hin - m.bottom) * DPI * z, x = u(2), w = u(17);
