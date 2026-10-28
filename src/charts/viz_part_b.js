/* charts/viz_part_b.js: part-to-whole charts, part 2: sunburst, waffle, funnel.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, compact_num, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct, tip_text } from './viz_math.js';
import { frame, svg, band, arc, mark_group, hit_row } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

const ring = (d, fill) => `<path class="mark" d="${d}" style="fill:${fill};stroke:rgb(var(--surface));stroke-width:2"/>`;

export const VIZ_PART_B = {
  sunburst: { t: 'Sunburst chart', g: 'part', d: 'A hierarchy as rings: groups inside, their parts outside.', f(w) {
    const groups = SER.slice(0, 3), kids = groups.map(() => uwords(3).map(k => ({ k, v: rnd(5, 30) }))), tot = kids.flat().reduce((s, o) => s + o.v, 0);
    const f = frame(w, 260, { l: 0, r: 0, t: 6, b: 6 }), rad = Math.min(120, f.ih / 2), cx = f.w / 2, cy = f.t + f.ih / 2; let a = 0, parts = '';
    kids.forEach((ch, gi) => { const gv = ch.reduce((s, o) => s + o.v, 0), g0 = a;
      ch.forEach((o, j) => { const a0 = a; a += o.v / tot * Math.PI * 2;
        parts += mark_group(o.k, [[num(o.v), groups[gi], gi]], ring(arc(cx, cy, rad * .62, rad, a0, a),
          `color-mix(in oklab, ${scale_color(gi)} ${80 - j * 18}%, rgb(var(--surface)))`)); });
      parts += mark_group(groups[gi], [[num(gv), pct(gv / tot) + ' of total', gi]], ring(arc(cx, cy, rad * .22, rad * .6, g0, a), scale_color(gi))); });
