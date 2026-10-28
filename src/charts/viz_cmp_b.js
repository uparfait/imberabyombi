/* charts/viz_cmp_b.js: comparison charts, part 2: lollipop, dumbbell, bullet, waterfall.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, MARGIN } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, hbar, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_CMP_B = {
  lollipop: { t: 'Lollipop chart', g: 'cmp', d: 'A lighter bar chart: a hairline stem and a dot.', f(w) {
    const c = uwords(9), v = c.map(() => rnd(10, 100) * MARGIN()), f = frame(w, 240), ax = y_axis(f, Math.max(...v)), x = band(c.length, f.l, f.w - f.r);
