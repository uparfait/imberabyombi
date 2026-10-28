/* charts/viz_svg.js: the SVG building blocks (frame, axes, bars, dots, hit areas), as trusted strings.
   Method: one axis per chart, thin marks (bars <= 24px, 4px rounded data-end, 2px lines, >= 8px dots), hairline grid.
   Every piece of text goes through esc(); the chart cards insert the finished SVG with dangerouslySetInnerHTML. */
import { esc } from '../lib/index.js';
import { round1, compact_num, linear, ticks, fit, tip_text } from './viz_math.js';

/* frame + axes */
export const frame = (w, h, p = {}) => {
  const f = { w, h, l: p.l ?? 40, r: p.r ?? 14, t: p.t ?? 16, b: p.b ?? 28 }; f.iw = w - f.l - f.r; f.ih = h - f.t - f.b; return f;
};
export const svg = (f, body, label) => `<svg viewBox="0 0 ${f.w} ${f.h}" width="${f.w}" height="${f.h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
export function y_axis(f, hi, lo = 0, fmt = compact_num) {
  const ts = ticks(Math.min(lo, 0), hi), y = linear(ts[0], ts.at(-1), f.t + f.ih, f.t);
  return { y, lo: ts[0], hi: ts.at(-1), g: ts.map(v => `<line class="grid_line" x1="${f.l}" x2="${f.w - f.r}" y1="${round1(y(v))}" y2="${round1(y(v))}"/>`
    + `<text x="${f.l - 8}" y="${round1(y(v)) + 3.5}" text-anchor="end">${fmt(v)}</text>`).join('') };
}
export function x_axis(f, hi, lo = 0, fmt = compact_num) {
  const ts = ticks(Math.min(lo, 0), hi), x = linear(ts[0], ts.at(-1), f.l, f.l + f.iw);
  return { x, g: ts.map(v => `<line class="grid_line" y1="${f.t}" y2="${f.t + f.ih}" x1="${round1(x(v))}" x2="${round1(x(v))}"/>`
    + `<text x="${round1(x(v))}" y="${f.h - 8}" text-anchor="middle">${fmt(v)}</text>`).join('') };
}
export const chart_base = (f, y) => `<line class="base_line" x1="${f.l}" x2="${f.w - f.r}" y1="${round1(y)}" y2="${round1(y)}"/>`;
