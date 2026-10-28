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
  area: { t: 'Area chart', g: 'time', d: 'One series over time, filled lightly to its baseline.', f(w) {
    const m = MONTHS(); let a = 40; const v = m.map(() => (a = Math.max(8, a + rnd(-9, 11))) * MARGIN()), f = frame(w, 240), ax = y_axis(f, Math.max(...v));
    const x = band(m.length, f.l, f.w - f.r), pts = v.map((val, i) => [x(i), ax.y(val)]);
    return { svg: svg(f, ax.g + `<path d="${path_of(pts)}L${round1(x(11))} ${round1(ax.y(0))}L${round1(x(0))} ${round1(ax.y(0))}Z" style="fill:var(--series_1);opacity:.1"/>`
        + `<path class="series_line" d="${path_of(pts)}" style="stroke:var(--series_1)"/>${dot(x(11), ax.y(v[11]), 'var(--series_1)')}`
        + `<text class="value_label" x="${round1(x(11))}" y="${round1(ax.y(v[11]) - 10)}" text-anchor="end">${num(v[11])}</text>`
      + chart_base(f, ax.y(0)) + x_labels(f, m, x) + cross_bands(f, m, x, i => [[num(v[i]), 'Value', 0]]), 'Area chart'),
      table: [['Month', 'Value'], m.map((k, i) => [k, num(v[i])])] }; } },
  stacked_area: { t: 'Stacked area chart', g: 'time', d: 'Parts of a total over time; the top edge is the total.', seed: 'stackedArea', f(w) {
    const m = MONTHS(), s = SER.slice(0, 3), v = s.map(() => { let a = rnd(15, 30); return m.map(() => (a = Math.max(4, a + rnd(-4, 5))) * MARGIN()); });
    const f = frame(w, 260), cum = m.map((_, i) => s.map((__, j) => v.slice(0, j + 1).reduce((t, r) => t + r[i], 0)));
    const ax = y_axis(f, Math.max(...cum.map(r => r.at(-1)))), x = band(m.length, f.l, f.w - f.r);
    const layer = j => {
      const top = m.map((_, i) => [x(i), ax.y(cum[i][j])]), bot = m.map((_, i) => [x(i), ax.y(j ? cum[i][j - 1] : 0)]).reverse();
      return `<path d="${path_of([...top, ...bot])}Z" style="fill:${scale_color(j)};opacity:.55"/>`
        + `<path class="series_line" d="${path_of(top)}" style="stroke:${scale_color(j)}"/>`; };
    return { svg: svg(f, ax.g + s.map((_, j) => layer(j)).join('') + chart_base(f, ax.y(0)) + x_labels(f, m, x)
        + cross_bands(f, m, x, i => [...s.map((n, j) => [num(v[j][i]), n, j]).reverse(), [num(cum[i].at(-1)), 'Total', null]]), 'Stacked area chart'),
