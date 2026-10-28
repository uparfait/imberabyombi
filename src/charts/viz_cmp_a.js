/* charts/viz_cmp_a.js: comparison charts, part 1: bar, horizontal bar, stacked bar, 100% stacked bar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct } from './viz_math.js';
import { frame, svg, y_axis, chart_base, band, x_labels, vbar, hbar, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_CMP_A = {
  bar: { t: 'Bar chart', g: 'cmp', d: 'One measure across categories. The highest bar is labelled.', f(w) {
    const c = uwords(8), v = c.map(() => rnd(20, 100) * MARGIN()), f = frame(w, 250), ax = y_axis(f, Math.max(...v)), x = band(c.length, f.l, f.w - f.r);
    const bw = Math.min(24, x.bw * .6), top = v.indexOf(Math.max(...v));
    return { svg: svg(f, ax.g + c.map((k, i) => mark_group(k, [[num(v[i]), 'Value', 0]], hit_col(f, x, i)
