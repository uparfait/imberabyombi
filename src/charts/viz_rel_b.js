/* charts/viz_rel_b.js: relationship charts, part 2: Sankey diagram, network graph, dendrogram.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, cap, lorem } from '../lib/index.js';
import { round1, linear, uwords, scale_color, fit } from './viz_math.js';
import { frame, svg, band, dot, mark_group } from './viz_svg.js';
