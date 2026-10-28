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
    const d = c.map(() => { const max = 100, t = rnd(60, 90); return { max, t, a: rnd(40, 98), bands: [50, 75, 100] }; });
    return { svg: svg(f, c.map((k, i) => {
      const x = linear(0, d[i].max, f.l, f.l + f.iw), h = Math.min(22, y.bw * .7), from = j => x(j ? d[i].bands[j - 1] : 0);
      return mark_group(k, [[round1(d[i].a), 'Actual', 0], [round1(d[i].t), 'Target', null]], hit_row(f, y, i)
        + d[i].bands.map((bv, j) => `<rect x="${round1(from(j))}" y="${round1(y(i) - h / 2)}" width="${round1(x(bv) - from(j))}" height="${round1(h)}"`
          + ` style="fill:rgb(var(--fg) / ${[.12, .07, .035][j]})"/>`).join('')
        + `<path class="mark" style="fill:var(--series_1)" d="${hbar(y(i), h * .38, f.l, x(d[i].a))}"/>`
        + `<line x1="${round1(x(d[i].t))}" x2="${round1(x(d[i].t))}" y1="${round1(y(i) - h / 2 - 2)}" y2="${round1(y(i) + h / 2 + 2)}"`
        + ` style="stroke:rgb(var(--fg));stroke-width:2"/>`)
        + `<text x="${f.l - 8}" y="${round1(y(i) + 4)}" text-anchor="end">${k}</text>`; }).join(''), 'Bullet chart'),
      legend: legend(['Actual', 'Target'], 'rect', [0, 'rgb(var(--fg))']),
      table: [['Measure', 'Actual', 'Target'], c.map((k, i) => [k, round1(d[i].a), round1(d[i].t)])] }; } },
  waterfall: { t: 'Waterfall chart', g: 'cmp', d: 'How a start value becomes an end value, step by step.', f(w) {
    const steps = [['Start', 120, 'total'], ['Sales', 48], ['Services', 22], ['Refunds', -18], ['Costs', -36], ['Tax', -14], ['End', 0, 'total']]
      .map(([k, v, t]) => [k, v * MARGIN(), t]); let run = 0;
    const bars = steps.map(([k, v, t], i) => {
      if (t && i) v = run; const a = t ? 0 : run, b = t ? v : run + v; if (!t || !i) run = t ? v : run + v; return { k, v, a, b, t }; });
    const hi = Math.max(...bars.map(o => Math.max(o.a, o.b))), f = frame(w, 250), ax = y_axis(f, hi), x = band(bars.length, f.l, f.w - f.r);
    const bw = Math.min(24, x.bw * .6);
    return { svg: svg(f, ax.g + bars.map((o, i) => {
      const c = o.t ? 'rgb(var(--fg) / .72)' : o.b >= o.a ? 'var(--series_2)' : 'var(--series_1)', lo = Math.min(o.a, o.b), up = Math.max(o.a, o.b);
      return mark_group(o.k, [[(o.t ? '' : o.b >= o.a ? '+' : '−') + num(Math.abs(o.b - o.a)), o.t ? 'Total' : o.b >= o.a ? 'Increase' : 'Decrease', null]],
        hit_col(f, x, i) + `<path class="mark" style="fill:${c}" d="${o.t || o.b >= o.a ? vbar(x(i), bw, ax.y(lo), ax.y(up)) : vbar(x(i), bw, ax.y(up), ax.y(lo))}"/>`)
        + (i < bars.length - 1 ? `<line class="grid_line" x1="${round1(x(i) + bw / 2)}" x2="${round1(x(i + 1) - bw / 2)}"`
          + ` y1="${round1(ax.y(o.b))}" y2="${round1(ax.y(o.b))}"/>` : ''); }).join('')
      + chart_base(f, ax.y(0)) + x_labels(f, bars.map(o => o.k), x), 'Waterfall chart'),
      legend: legend(['Total', 'Increase', 'Decrease'], 'rect', ['rgb(var(--fg) / .72)', 'var(--series_2)', 'var(--series_1)']),
