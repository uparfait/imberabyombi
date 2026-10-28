/* editor/ui/rulers.js: the rulers (source "rulers"): an SVG scale in inches over the first page (horizontal) and beside
   the page in view (vertical), the margins shaded, and handles that drag a margin (sixteenths of an inch; the value shows
   next to the pointer while dragging; one history step when let go). Lengths along the page are page units
   (inches × 96 × zoom); the ruler's own thickness, ticks and handles scale with the root font (u()). Once a margin differs
   from the default, "Reset margins" shows at the end of the ruler. */
import { state, refs, hruler, vruler, scroller, DPI, dims, page_wraps, layout_page, clamp, begin_op, commit, save_soon, default_setup } from '../core/index.js';
import { tip } from '../../overlays/index.js';
import { apply_setup } from './view.js';
import { scaled, mi } from './ui_dom.js';

const u = n => +scaled(n).toFixed(2);
const changed = m => { const d = default_setup().margins; return Object.keys(d).some(k => m[k] !== d[k]); };
/* the four margins back to the default (one history step, like a drag) */
export function reset_margins() {

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
  const knob = `<rect class="knob" x="${x}" y="${-u(2)}" width="${w}" height="${u(4)}" rx="${u(1)}"/><rect x="0" y="${-u(6)}" width="${u(20)}" height="${u(12)}" fill="transparent"/>`;
  vruler.innerHTML = `<svg width="${u(20)}" height="${H}" style="position:absolute;left:0;top:${top}px;overflow:visible"><rect class="r_bg" x="${x}" y="0" width="${w}" height="${H}"/>`
    + `<rect class="r_margin" x="${x}" y="0" width="${w}" height="${ty}"/><rect class="r_margin" x="${x}" y="${by}" width="${w}" height="${H - by}"/>${ruler_ticks(hin, m.top, false, z)}`
    + `<g class="r_handle v" data-handle="top" transform="translate(0 ${ty})">${knob}</g><g class="r_handle v" data-handle="bottom" transform="translate(0 ${by})">${knob}</g></svg>`;
}
/* the dragged margin's value next to the pointer: a label drawn like the template tooltip (#tip itself is hidden by the
   template's hover handling whenever the ruler redraws under the pointer) */
const VALUE_CSS = 'position:fixed;z-index:400;padding:.25rem .5rem;border-radius:calc(var(--radius) * .5);font:500 .75rem/1rem var(--font_sans);'
  + 'color:rgb(var(--bg));background:rgb(var(--fg) / .92);pointer-events:none;white-space:nowrap';
let value_el = null;
function show_value(text, x, y) {
  if (!value_el) { value_el = document.createElement('div'); value_el.className = 'ruler_value'; value_el.setAttribute('role', 'status'); value_el.style.cssText = VALUE_CSS; }
  if (!value_el.isConnected) document.body.appendChild(value_el);
  value_el.textContent = text; tip.hide();
  const e = scaled(4), w = value_el.offsetWidth;
  value_el.style.left = clamp(x - w / 2, e, innerWidth - w - e) + 'px'; value_el.style.top = (y + scaled(18)) + 'px';
}
const hide_value = () => { if (value_el) value_el.remove(); };
export function ruler_drag(e) {
  const g = e.target.closest('[data-handle]'); if (!g || state.mode !== 'edit') return;
  e.preventDefault();
  const side = g.dataset.handle, horiz = side === 'left' || side === 'right', m = state.setup.margins, orig = m[side];
  const start = horiz ? e.clientX : e.clientY, { win, hin } = dims();
  const move = ev => {
    const d = ((horiz ? ev.clientX : ev.clientY) - start) / state.zoom / DPI;
    const span = horiz ? win - (side === 'left' ? m.right : m.left) : hin - (side === 'top' ? m.bottom : m.top);
    m[side] = clamp(Math.round(((side === 'left' || side === 'top') ? orig + d : orig - d) * 16) / 16, 0, span - 1);
    page_wraps().forEach(layout_page); update_rulers();
    show_value(`${side[0].toUpperCase() + side.slice(1)} margin: ${m[side]}"`, ev.clientX, ev.clientY);
  };
  const up = () => {
    removeEventListener('pointermove', move); removeEventListener('pointerup', up); hide_value();
    begin_op(); apply_setup(true); commit(); save_soon();
  };
  addEventListener('pointermove', move); addEventListener('pointerup', up);
}
