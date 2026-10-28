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
