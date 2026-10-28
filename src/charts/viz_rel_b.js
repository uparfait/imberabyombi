/* charts/viz_rel_b.js: relationship charts, part 2: Sankey diagram, network graph, dendrogram.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, cap, lorem } from '../lib/index.js';
import { round1, linear, uwords, scale_color, fit } from './viz_math.js';
import { frame, svg, band, dot, mark_group } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_REL_B = {
  sankey: { t: 'Sankey diagram', g: 'rel', d: 'Flows from sources, through stages, to outcomes.', f(w) {
    const cols = [['Search', 'Social', 'Email'], ['Pricing', 'Docs'], ['Signed up', 'Left']];
    const links = [[0, 0, 0, 30], [0, 0, 1, 20], [0, 1, 0, 12], [0, 1, 1, 18], [0, 2, 0, 15], [0, 2, 1, 5], [1, 0, 0, 34], [1, 0, 1, 23], [1, 1, 0, 14], [1, 1, 1, 26]];
