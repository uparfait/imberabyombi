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
    const f = frame(w, 260, { l: 8, r: 8, t: 10, b: 10 }), nw = 12, col_x = i => f.l + (f.iw - nw) * i / (cols.length - 1), gap = 14;
    const val = (c, i) => Math.max(links.filter(l => l[0] === c && l[1] === i).reduce((s, l) => s + l[3], 0),
      links.filter(l => l[0] === c - 1 && l[2] === i).reduce((s, l) => s + l[3], 0));
    /* one scale for every column (so a flow is equally thick at both ends), each column centred */
    const tots = cols.map((nodes, c) => nodes.reduce((s, _, i) => s + val(c, i), 0)), k = Math.min(...cols.map((nodes, c) => (f.ih - gap * (nodes.length - 1)) / tots[c]));
