/* charts/viz_time_a.js: change over time, part 1: line, area, stacked area, step line, sparklines.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] }.
   seed: the reference's chart key, when the key was renamed (the random demo data is seeded with it, so it stays the same). */
import { esc, lorem } from '../lib/index.js';
import { round1, num, linear, rnd, MONTHS, uwords, SER, scale_color, MARGIN, fit, spread } from './viz_math.js';
import { frame, svg, y_axis, chart_base, band, x_labels, path_of, dot, cross_bands, mark_group, hit_row } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_TIME_A = {
