/* charts/viz_cmp_a.js: comparison charts, part 1: bar, horizontal bar, stacked bar, 100% stacked bar.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, SER, scale_color, MARGIN, pct } from './viz_math.js';
import { frame, svg, y_axis, chart_base, band, x_labels, vbar, hbar, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend } from './viz_legend.jsx';

export const VIZ_CMP_A = {
  bar: { t: 'Bar chart', g: 'cmp', d: 'One measure across categories. The highest bar is labelled.', f(w) {
    const c = uwords(8), v = c.map(() => rnd(20, 100) * MARGIN()), f = frame(w, 250), ax = y_axis(f, Math.max(...v)), x = band(c.length, f.l, f.w - f.r);
    const bw = Math.min(24, x.bw * .6), top = v.indexOf(Math.max(...v));
    return { svg: svg(f, ax.g + c.map((k, i) => mark_group(k, [[num(v[i]), 'Value', 0]], hit_col(f, x, i)
        + `<path class="mark" style="fill:var(--series_1)" d="${vbar(x(i), bw, ax.y(0), ax.y(v[i]))}"/>`)).join('')
      + chart_base(f, ax.y(0)) + x_labels(f, c, x)
      + `<text class="value_label" x="${round1(x(top))}" y="${round1(ax.y(v[top]) - 7)}" text-anchor="middle">${num(v[top])}</text>`, 'Bar chart'),
      table: [['Category', 'Value'], c.map((k, i) => [k, num(v[i])])] }; } },
  hbar: { t: 'Horizontal bar chart', g: 'cmp', d: 'Ranked categories with long names. Values sit at the bar tips.', f(w) {
    const c = uwords(6), v = c.map(() => rnd(15, 100) * MARGIN()).sort((a, b) => b - a), f = frame(w, 230, { l: 92, r: 52, b: 10 });
    const x = linear(0, Math.max(...v), f.l, f.l + f.iw), y = band(c.length, f.t, f.t + f.ih), bh = Math.min(20, y.bw * .62);
    return { svg: svg(f, c.map((k, i) => mark_group(k, [[num(v[i]), 'Value', 0]], hit_row(f, y, i)
        + `<path class="mark" style="fill:var(--series_1)" d="${hbar(y(i), bh, f.l, x(v[i]))}"/>`) + row_label(f, y, i, k)
        + `<text class="value_label" x="${round1(x(v[i]) + 6)}" y="${round1(y(i) + 4)}">${num(v[i])}</text>`).join('')
      + `<line class="base_line" x1="${f.l}" x2="${f.l}" y1="${f.t}" y2="${f.t + f.ih}"/>`, 'Horizontal bar chart'),
      table: [['Category', 'Value'], c.map((k, i) => [k, num(v[i])])] }; } },
  stacked: { t: 'Stacked bar chart', g: 'cmp', d: 'Totals and their parts. A 2px gap separates the segments.', f(w) {
    const c = uwords(6), s = SER.slice(0, 3), v = c.map(() => s.map(() => rnd(10, 40) * MARGIN())), tot = v.map(r => r.reduce((a, b) => a + b));
    const f = frame(w, 250), ax = y_axis(f, Math.max(...tot)), x = band(c.length, f.l, f.w - f.r), bw = Math.min(24, x.bw * .6);
    const seg = (i) => { let acc = 0; return v[i].map((val, j) => {
      const y0 = ax.y(acc), y1v = ax.y(acc + val); acc += val; const top = j === v[i].length - 1, gap = j ? 1 : 0;
      return top ? `<path class="mark" style="fill:${scale_color(j)}" d="${vbar(x(i), bw, y0 - gap, y1v)}"/>`
        : `<rect class="mark" style="fill:${scale_color(j)}" x="${round1(x(i) - bw / 2)}" y="${round1(y1v + 1)}" width="${round1(bw)}"`
          + ` height="${round1(Math.max(0, y0 - y1v - 1 - gap))}"/>`; }).join(''); };
    return { svg: svg(f, ax.g + c.map((k, i) => mark_group(k, [...s.map((n, j) => [num(v[i][j]), n, j]), [num(tot[i]), 'Total', null]], hit_col(f, x, i) + seg(i))).join('')
      + chart_base(f, ax.y(0)) + x_labels(f, c, x), 'Stacked bar chart'),
      legend: legend(s), table: [['Category', ...s, 'Total'], c.map((k, i) => [k, ...v[i].map(num), num(tot[i])])] }; } },
  stacked100: { t: '100% stacked bar chart', g: 'cmp', d: 'Shares within each row, all rows the same length.', f(w) {
