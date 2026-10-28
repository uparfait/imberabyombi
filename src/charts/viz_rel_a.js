/* charts/viz_rel_a.js: relationship charts, part 1: scatter, bubble, heatmap, correlogram, radar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { fmt_hour } from '../lib/index.js';
import { round1, num, linear, rnd, gauss, SER, scale_color, sequential, diverging, fit, tip_text } from './viz_math.js';
import { frame, svg, y_axis, path_of, dot, mark_group } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';
