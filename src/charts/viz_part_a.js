/* charts/viz_part_a.js: part-to-whole charts, part 1: pie, donut, treemap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc } from '../lib/index.js';
import { round1, compact_num, num, rnd, uwords, SER, scale_color, MARGIN, fit, pct } from './viz_math.js';
import { frame, svg, arc, mark_group } from './viz_svg.js';
