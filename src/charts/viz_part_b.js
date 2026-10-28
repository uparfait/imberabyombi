/* charts/viz_part_b.js: part-to-whole charts, part 2: sunburst, waffle, funnel.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, compact_num, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct, tip_text } from './viz_math.js';
