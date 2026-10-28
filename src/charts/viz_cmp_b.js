/* charts/viz_cmp_b.js: comparison charts, part 2: lollipop, dumbbell, bullet, waterfall.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, MARGIN } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, hbar, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_CMP_B = {
  lollipop: { t: 'Lollipop chart', g: 'cmp', d: 'A lighter bar chart: a hairline stem and a dot.', f(w) {
    const c = uwords(9), v = c.map(() => rnd(10, 100) * MARGIN()), f = frame(w, 240), ax = y_axis(f, Math.max(...v)), x = band(c.length, f.l, f.w - f.r);
    return { svg: svg(f, ax.g + c.map((k, i) => mark_group(k, [[num(v[i]), 'Value', 0]], hit_col(f, x, i)
        + `<line class="mark" x1="${round1(x(i))}" x2="${round1(x(i))}" y1="${round1(ax.y(0))}" y2="${round1(ax.y(v[i]))}"`
        + ` style="stroke:var(--series_1);stroke-width:2"/>` + dot(x(i), ax.y(v[i]), 'var(--series_1)', 5))).join('')
      + chart_base(f, ax.y(0)) + x_labels(f, c, x), 'Lollipop chart'), table: [['Category', 'Value'], c.map((k, i) => [k, num(v[i])])] }; } },
  dumbbell: { t: 'Dumbbell chart', g: 'cmp', d: 'Before and after for each row: the line is the change.', f(w) {
    const c = uwords(6), a = c.map(() => rnd(20, 70) * MARGIN()), b = a.map(x => x + rnd(-15, 35) * MARGIN()), f = frame(w, 230, { l: 82, b: 28 });
    const ax = x_axis(f, Math.max(...a, ...b)), y = band(c.length, f.t, f.t + f.ih);
    return { svg: svg(f, ax.g + c.map((k, i) => mark_group(k, [[num(a[i]), '2025', 1], [num(b[i]), '2026', 0]], hit_row(f, y, i)
        + `<line class="mark" x1="${round1(ax.x(a[i]))}" x2="${round1(ax.x(b[i]))}" y1="${round1(y(i))}" y2="${round1(y(i))}"`
        + ` style="stroke:rgb(var(--muted));stroke-width:2"/>` + dot(ax.x(a[i]), y(i), 'var(--series_2)') + dot(ax.x(b[i]), y(i), 'var(--series_1)'))
        + row_label(f, y, i, k)).join(''), 'Dumbbell chart'),
      legend: legend(['2025', '2026'], 'dot', [1, 0]),
      table: [['Category', '2025', '2026', 'Change'], c.map((k, i) => [k, num(a[i]), num(b[i]), (b[i] >= a[i] ? '+' : '') + num(b[i] - a[i])])] }; } },
  bullet: { t: 'Bullet chart', g: 'cmp', d: 'Actual against a target, over poor / fair / good bands.', f(w) {
    const c = ['Revenue', 'Profit', 'New users', 'Satisfaction'], f = frame(w, 200, { l: 92, r: 18, b: 10 }), y = band(c.length, f.t, f.t + f.ih);
