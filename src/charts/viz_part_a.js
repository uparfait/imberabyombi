/* charts/viz_part_a.js: part-to-whole charts, part 1: pie, donut, treemap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc } from '../lib/index.js';
import { round1, compact_num, num, rnd, uwords, SER, scale_color, MARGIN, fit, pct } from './viz_math.js';
import { frame, svg, arc, mark_group } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

/* one ring of slices (r0 = 0: a pie), each a mark group with its own tooltip rows */
const slices = (v, tot, cx, cy, r0, rad, tip) => { let a = 0; return v.map((val, i) => { const a0 = a; a += val / tot * Math.PI * 2;
