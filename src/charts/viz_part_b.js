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
    return { svg: svg(f, parts, 'Sunburst chart'), legend: legend(groups),
      table: [['Group', 'Part', 'Value'], kids.flatMap((ch, gi) => ch.map(o => [groups[gi], o.k, num(o.v)]))] }; } },
  waffle: { t: 'Waffle chart', g: 'part', d: '100 squares, one per percent: easy to count.', f(w) {
    const s = SER.slice(0, 3), raw = [rnd(25, 45), rnd(15, 30), rnd(8, 20)], p = raw.map(Math.round), rest = 100 - p.reduce((a, b) => a + b);
    const f = frame(w, 230, { l: 0, r: 0, t: 6, b: 6 }), cell = Math.min(19, (f.ih - 18) / 10), x0 = (f.w - cell * 10 - 18) / 2;
    const who = i => { let acc = 0; for (let j = 0; j < p.length; j++) { acc += p[j]; if (i < acc) return j; } return -1; };
    return { svg: svg(f, Array.from({ length: 100 }, (_, i) => { const j = who(i), col = j < 0 ? 'rgb(var(--surface_2))' : scale_color(j);
      return `<rect class="mark mark_cell" x="${round1(x0 + (i % 10) * (cell + 2))}" y="${round1(f.t + Math.floor(i / 10) * (cell + 2))}" width="${round1(cell)}"`
        + ` height="${round1(cell)}" rx="3" style="fill:${col}" ${tip_text(j < 0 ? 'Other' : s[j], [[(j < 0 ? rest : p[j]) + '%', 'Share', j < 0 ? null : j]])}/>`; }).join(''),
      'Waffle chart'),
      legend: legend([...s, 'Other'], 'rect', [0, 1, 2, 'rgb(var(--surface_2))']),
      table: [['Part', 'Share'], [...s.map((n, j) => [n, p[j] + '%']), ['Other', rest + '%']]] }; } },
  funnel: { t: 'Funnel chart', g: 'part', d: 'Steps of a process and how many continue to the next.', f(w) {
