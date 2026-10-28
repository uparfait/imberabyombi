/* charts/viz_part_a.js: part-to-whole charts, part 1: pie, donut, treemap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc } from '../lib/index.js';
import { round1, compact_num, num, rnd, uwords, SER, scale_color, MARGIN, fit, pct } from './viz_math.js';
import { frame, svg, arc, mark_group } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

/* one ring of slices (r0 = 0: a pie), each a mark group with its own tooltip rows */
const slices = (v, tot, cx, cy, r0, rad, tip) => { let a = 0; return v.map((val, i) => { const a0 = a; a += val / tot * Math.PI * 2;
  return mark_group(...tip(val, i),
    `<path class="mark" d="${arc(cx, cy, r0, rad, a0, a)}" style="fill:${scale_color(i)};stroke:rgb(var(--surface));stroke-width:2"/>`); }).join(''); };

export const VIZ_PART_A = {
  pie: { t: 'Pie chart', g: 'part', d: 'A few parts of a whole (keep it to 6 or fewer).', f(w) {
    const s = SER.slice(0, 4), v = s.map(() => rnd(10, 40)), tot = v.reduce((a, b) => a + b), f = frame(w, 240, { l: 0, r: 0, t: 10, b: 10 });
    const rad = Math.min(105, f.ih / 2), cx = f.w / 2, cy = f.t + f.ih / 2;
    return { svg: svg(f, slices(v, tot, cx, cy, 0, rad, (val, i) => [s[i], [[pct(val / tot), num(val) + ' of ' + num(tot), i]]]), 'Pie chart'),
      legend: legend(s.map((k, i) => `${k} ${Math.round(v[i] / tot * 100)}%`)), table: [['Part', 'Value', 'Share'], s.map((k, i) => [k, num(v[i]), pct(v[i] / tot)])] }; } },
  donut: { t: 'Donut chart', g: 'part', d: 'Parts of a whole with the total in the middle.', f(w) {
    const s = SER.slice(0, 5), v = s.map(() => rnd(10, 40) * MARGIN()), tot = v.reduce((a, b) => a + b), f = frame(w, 240, { l: 0, r: 0, t: 10, b: 10 });
    const rad = Math.min(105, f.ih / 2), cx = f.w / 2, cy = f.t + f.ih / 2;
    return { svg: svg(f, slices(v, tot, cx, cy, rad * .62, rad, (val, i) => [s[i], [[num(val), pct(val / tot) + ' of total', i]]])
      + `<text class="center_value" x="${cx}" y="${cy + 4}" text-anchor="middle">${compact_num(tot)}</text><text x="${cx}" y="${cy + 22}" text-anchor="middle">Total</text>`,
      'Donut chart'), legend: legend(s), table: [['Part', 'Value', 'Share'], s.map((k, i) => [k, num(v[i]), pct(v[i] / tot)])] }; } },
  treemap: { t: 'Treemap', g: 'part', d: 'Nested parts sized by value, coloured by group.', f(w) {
    const groups = SER.slice(0, 3), items = groups.flatMap((gname, gi) => uwords(4).map(k => ({ k, g: gi, v: rnd(5, 40) }))).sort((a, b) => b.v - a.v);
    const f = frame(w, 260, { l: 0, r: 0, t: 0, b: 0 });
    const out = []; (function split(list, x, y, wd, ht) {
      if (!list.length) return; if (list.length === 1) { out.push({ ...list[0], x, y, wd, ht }); return; }
      const tot = list.reduce((s, o) => s + o.v, 0); let acc = 0, k = 0; while (k < list.length - 1 && acc + list[k].v < tot / 2) acc += list[k++].v;
      if (!k) acc = list[k++].v; const r = acc / tot;
      if (wd >= ht) { split(list.slice(0, k), x, y, wd * r, ht); split(list.slice(k), x + wd * r, y, wd * (1 - r), ht); }
      else { split(list.slice(0, k), x, y, wd, ht * r); split(list.slice(k), x, y + ht * r, wd, ht * (1 - r)); } })(items, 0, 0, f.w, f.h);
    return { svg: svg(f, out.map(o => mark_group(o.k, [[num(o.v), groups[o.g], o.g]],
        `<rect class="mark" x="${round1(o.x + 1)}" y="${round1(o.y + 1)}" width="${round1(Math.max(0, o.wd - 2))}" height="${round1(Math.max(0, o.ht - 2))}" rx="4"`
        + ` style="fill:color-mix(in oklab, ${scale_color(o.g)} 30%, rgb(var(--surface)))"/>`
