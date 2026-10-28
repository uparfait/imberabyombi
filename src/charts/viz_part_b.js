/* charts/viz_part_b.js: part-to-whole charts, part 2: sunburst, waffle, funnel.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, compact_num, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct, tip_text } from './viz_math.js';
import { frame, svg, band, arc, mark_group, hit_row } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

const ring = (d, fill) => `<path class="mark" d="${d}" style="fill:${fill};stroke:rgb(var(--surface));stroke-width:2"/>`;

export const VIZ_PART_B = {
  sunburst: { t: 'Sunburst chart', g: 'part', d: 'A hierarchy as rings: groups inside, their parts outside.', f(w) {
    const groups = SER.slice(0, 3), kids = groups.map(() => uwords(3).map(k => ({ k, v: rnd(5, 30) }))), tot = kids.flat().reduce((s, o) => s + o.v, 0);
