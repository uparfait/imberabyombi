/* charts/viz_dist.js: distribution charts: histogram, box plot, violin plot, dot plot.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { lorem } from '../lib/index.js';
import { round1, linear, rnd, gauss, uwords, scale_color } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, path_of, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';

export const VIZ_DIST = {
