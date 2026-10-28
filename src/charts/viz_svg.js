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
export const band = (n, a, b) => { const bw = (b - a) / n; const x = i => a + bw * i + bw / 2; x.bw = bw; return x; };
export const x_labels = (f, labels, x, every = Math.ceil(labels.length / Math.max(1, Math.floor(f.iw / 46)))) =>
  labels.map((k, i) => i % every ? '' : `<text x="${round1(x(i))}" y="${f.h - 8}" text-anchor="middle">${esc(fit(k, x.bw * every - 4))}</text>`).join('');

/* marks: bars with a 4px rounded data-end, square at the baseline */
export function vbar(cx, w, yb, yt) {
  const x = cx - w / 2, h = Math.abs(yb - yt), r = Math.min(4, w / 2, h), up = yt <= yb, e = up ? r : -r;
  return `M${round1(x)} ${round1(yb)}V${round1(yt + e)}Q${round1(x)} ${round1(yt)} ${round1(x + r)} ${round1(yt)}`
    + `H${round1(x + w - r)}Q${round1(x + w)} ${round1(yt)} ${round1(x + w)} ${round1(yt + e)}V${round1(yb)}Z`;
}
export function hbar(cy, h, xb, xt) {
  const y = cy - h / 2, r = Math.min(4, h / 2, Math.abs(xt - xb)), e = xt >= xb ? -r : r;
  return `M${round1(xb)} ${round1(y)}H${round1(xt + e)}Q${round1(xt)} ${round1(y)} ${round1(xt)} ${round1(y + r)}`
    + `V${round1(y + h - r)}Q${round1(xt)} ${round1(y + h)} ${round1(xt + e)} ${round1(y + h)}H${round1(xb)}Z`;
}
export const path_of = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${round1(x)} ${round1(y)}`).join('');
export const dot = (x, y, c, r = 4.5) => `<circle class="mark mark_dot" cx="${round1(x)}" cy="${round1(y)}" r="${r}" style="fill:${c}"/>`;
/* x-position hit bands with a crosshair (line + area charts): one tooltip lists every series at that x */
export const cross_bands = (f, labels, x, rows) => labels.map((k, i) => `<g class="x_band" ${tip_text(k, rows(i))}>`
  + `<rect class="hit_area" x="${round1(x(i) - x.bw / 2)}" y="${f.t}" width="${round1(x.bw)}" height="${f.ih}"/>`
  + `<line class="crosshair" x1="${round1(x(i))}" x2="${round1(x(i))}" y1="${f.t}" y2="${f.t + f.ih}"/></g>`).join('');
