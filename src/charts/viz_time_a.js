/* charts/viz_time_a.js: change over time, part 1: line, area, stacked area, step line, sparklines.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] }.
   seed: the reference's chart key, when the key was renamed (the random demo data is seeded with it, so it stays the same). */
import { esc, lorem } from '../lib/index.js';
import { round1, num, linear, rnd, MONTHS, uwords, SER, scale_color, MARGIN, fit, spread } from './viz_math.js';
import { frame, svg, y_axis, chart_base, band, x_labels, path_of, dot, cross_bands, mark_group, hit_row } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_TIME_A = {
  line: { t: 'Line graph', g: 'time', d: 'Trends over time. Lines are labelled at their ends.', f(w) {
    const m = MONTHS(), s = SER.slice(0, 3), v = s.map((_, j) => { let a = rnd(30, 60); return m.map(() => (a = Math.max(5, a + rnd(-8, 10) + j))).map(x => x * MARGIN()); });
    const f = frame(w, 260, { r: 58 }), ax = y_axis(f, Math.max(...v.flat())), x = band(m.length, f.l, f.w - f.r);
    const ly = spread(v.map(r => ax.y(r[11]) + 4));
    return { svg: svg(f, ax.g + chart_base(f, ax.y(0)) + v.map((r, j) => `<path class="series_line" d="${path_of(r.map((val, i) => [x(i), ax.y(val)]))}"`
        + ` style="stroke:${scale_color(j)}"/>${dot(x(11), ax.y(r[11]), scale_color(j))}<text x="${round1(x(11) + 9)}" y="${round1(ly[j])}">${s[j]}</text>`).join('')
      + x_labels(f, m, x) + cross_bands(f, m, x, i => s.map((n, j) => [num(v[j][i]), n, j])), 'Line graph'),
      legend: legend(s, 'line'), table: [['Month', ...s], m.map((k, i) => [k, ...v.map(r => num(r[i]))])] }; } },
