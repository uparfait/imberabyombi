/* charts/viz_dist.js: distribution charts: histogram, box plot, violin plot, dot plot.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { lorem } from '../lib/index.js';
import { round1, linear, rnd, gauss, uwords, scale_color } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, path_of, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';

export const VIZ_DIST = {
  histogram: { t: 'Histogram', g: 'dist', d: 'How values spread across equal ranges (bins).', f(w) {
    const vals = Array.from({ length: 400 }, () => 50 + gauss() * 14), bins = 16, lo = 0, hi = 100, step = (hi - lo) / bins, cnt = Array(bins).fill(0);
    vals.forEach(v => { const b = Math.min(bins - 1, Math.max(0, Math.floor((v - lo) / step))); cnt[b]++; });
    const f = frame(w, 240), ax = y_axis(f, Math.max(...cnt)), x = linear(lo, hi, f.l, f.l + f.iw), bin = i => `${i * step}–${(i + 1) * step}`;
    return { svg: svg(f, ax.g + cnt.map((n, i) => mark_group(bin(i), [[n, 'Count', 0]],
        `<rect class="hit_area" x="${round1(x(i * step))}" y="${f.t}" width="${round1(x(step) - x(0))}" height="${f.ih}"/>`
