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
