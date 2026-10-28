/* charts/viz_cmp_a.js: comparison charts, part 1: bar, horizontal bar, stacked bar, 100% stacked bar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct } from './viz_math.js';
import { frame, svg, y_axis, chart_base, band, x_labels, vbar, hbar, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
