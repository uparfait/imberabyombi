/* charts/viz_rel_a.js: relationship charts, part 1: scatter, bubble, heatmap, correlogram, radar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { fmt_hour } from '../lib/index.js';
import { round1, num, linear, rnd, gauss, SER, scale_color, sequential, diverging, fit, tip_text } from './viz_math.js';
import { frame, svg, y_axis, path_of, dot, mark_group } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';

/* the 0..100 labels under a scatter or bubble chart */
const x_ticks = (f, xs) => [0, 25, 50, 75, 100].map(t => `<text x="${round1(xs(t))}" y="${f.h - 8}" text-anchor="middle">${t}</text>`).join('');

export const VIZ_REL_A = {
  scatter: { t: 'Scatter plot', g: 'rel', d: 'How two measures move together, by group (3 groups max).', f(w) {
    const gr = SER.slice(0, 3), pts = gr.flatMap((_, g) => Array.from({ length: 16 }, () => {
      const xv = rnd(5, 95); return { g, x: xv, y: Math.max(2, Math.min(98, xv * (.4 + g * .25) + 20 + gauss() * 10)) }; }));
    const f = frame(w, 260), ax = y_axis(f, 100), xs = linear(0, 100, f.l, f.l + f.iw);
    return { svg: svg(f, ax.g + x_ticks(f, xs) + pts.map(p => mark_group(gr[p.g], [[`${round1(p.x)}, ${round1(p.y)}`, 'x, y', p.g]],
      `<circle class="hit_area" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="12"/>${dot(xs(p.x), ax.y(p.y), scale_color(p.g))}`)).join(''), 'Scatter plot'),
      legend: legend(gr, 'dot'), table: [['Group', 'x', 'y'], pts.map(p => [gr[p.g], round1(p.x), round1(p.y)])] }; } },
  bubble: { t: 'Bubble chart', g: 'rel', d: 'A scatter plot where dot size shows a third measure.', f(w) {
    const gr = SER.slice(0, 2), pts = gr.flatMap((_, g) => Array.from({ length: 8 }, () => ({ g, x: rnd(8, 92), y: rnd(10, 90), s: rnd(5, 100) })));
    const f = frame(w, 260), ax = y_axis(f, 100), xs = linear(0, 100, f.l, f.l + f.iw), rs = s => 4 + Math.sqrt(s) * 2.2;
    return { svg: svg(f, ax.g + x_ticks(f, xs) + pts.sort((a, b) => b.s - a.s).map(p => mark_group(gr[p.g],
      [[num(p.s), 'Size', p.g], [`${round1(p.x)}, ${round1(p.y)}`, 'x, y', null]],
      `<circle class="mark" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="${round1(Math.max(12, rs(p.s)))}" style="fill:transparent"/>`
      + `<circle class="mark" cx="${round1(xs(p.x))}" cy="${round1(ax.y(p.y))}" r="${round1(rs(p.s))}"`
      + ` style="fill:color-mix(in srgb, ${scale_color(p.g)} 60%, transparent);stroke:rgb(var(--surface));stroke-width:2"/>`)).join(''), 'Bubble chart'),
      legend: legend(gr, 'dot'), table: [['Group', 'x', 'y', 'Size'], pts.map(p => [gr[p.g], round1(p.x), round1(p.y), num(p.s)])] }; } },
  heatmap: { t: 'Heatmap', g: 'rel', d: 'Values on a grid (day × hour). Darker = more.', f(w) {
    const days = Array.from({ length: 7 }, (_, i) => new Date(2026, 9, 25 + i).toLocaleDateString(undefined, { weekday: 'short' }));
