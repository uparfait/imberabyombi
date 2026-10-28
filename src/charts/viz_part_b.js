/* charts/viz_part_b.js: part-to-whole charts, part 2: sunburst, waffle, funnel.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, compact_num, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct, tip_text } from './viz_math.js';
import { frame, svg, band, arc, mark_group, hit_row } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

const ring = (d, fill) => `<path class="mark" d="${d}" style="fill:${fill};stroke:rgb(var(--surface));stroke-width:2"/>`;
