/* charts/viz_cmp_b.js: comparison charts, part 2: lollipop, dumbbell, bullet, waterfall.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, MARGIN } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, hbar, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
