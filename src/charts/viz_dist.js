/* charts/viz_dist.js: distribution charts: histogram, box plot, violin plot, dot plot.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { lorem } from '../lib/index.js';
import { round1, linear, rnd, gauss, uwords, scale_color } from './viz_math.js';
import { frame, svg, y_axis, x_axis, chart_base, band, x_labels, vbar, path_of, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';

export const VIZ_DIST = {
  histogram: { t: 'Histogram', g: 'dist', d: 'How values spread across equal ranges (bins).', f(w) {
    const vals = Array.from({ length: 400 }, () => 50 + gauss() * 14), bins = 16, lo = 0, hi = 100, step = (hi - lo) / bins, cnt = Array(bins).fill(0);
    vals.forEach(v => { const b = Math.min(bins - 1, Math.max(0, Math.floor((v - lo) / step))); cnt[b]++; });
    const f = frame(w, 240), ax = y_axis(f, Math.max(...cnt)), x = linear(lo, hi, f.l, f.l + f.iw), bin = i => `${i * step}–${(i + 1) * step}`;
    return { svg: svg(f, ax.g + cnt.map((n, i) => mark_group(bin(i), [[n, 'Count', 0]],
        `<rect class="hit_area" x="${round1(x(i * step))}" y="${f.t}" width="${round1(x(step) - x(0))}" height="${f.ih}"/>`
        + `<path class="mark" style="fill:var(--series_1)" d="${vbar((x(i * step) + x((i + 1) * step)) / 2, x(step) - x(0) - 2, ax.y(0), ax.y(n))}"/>`)).join('')
      + chart_base(f, ax.y(0)) + [0, 25, 50, 75, 100].map(t => `<text x="${round1(x(t))}" y="${f.h - 8}" text-anchor="middle">${t}</text>`).join(''), 'Histogram'),
      table: [['Range', 'Count'], cnt.map((n, i) => [bin(i), n])] }; } },
  box: { t: 'Box plot', g: 'dist', d: 'Median, middle half (box), range (whiskers) and outliers.', f(w) {
    const g = uwords(5), sets = g.map(() => { const m = rnd(35, 65), s = rnd(6, 16); return Array.from({ length: 60 }, () => m + gauss() * s).sort((a, b) => a - b); });
    const q = (a, p) => a[Math.floor((a.length - 1) * p)], st = sets.map(a => {
      const q1 = q(a, .25), q3 = q(a, .75), iq = q3 - q1, lo = a.find(v => v >= q1 - 1.5 * iq), hi = [...a].reverse().find(v => v <= q3 + 1.5 * iq);
      return { q1, q3, med: q(a, .5), lo, hi, out: a.filter(v => v < lo || v > hi) }; });
    const f = frame(w, 250), ax = y_axis(f, 100), x = band(g.length, f.l, f.w - f.r), bw = Math.min(36, x.bw * .5);
    const ln = (x1, x2, y1, y2, sw = 1.5) => `<line x1="${round1(x1)}" x2="${round1(x2)}" y1="${round1(y1)}" y2="${round1(y2)}"`
      + ` style="stroke:var(--series_1);stroke-width:${sw}"/>`;
    return { svg: svg(f, ax.g + st.map((o, i) => mark_group(g[i],
        [[round1(o.med), 'Median', 0], [`${round1(o.q1)}–${round1(o.q3)}`, 'Middle half', null], [`${round1(o.lo)}–${round1(o.hi)}`, 'Range', null]], hit_col(f, x, i)
        + ln(x(i), x(i), ax.y(o.lo), ax.y(o.hi)) + ln(x(i) - bw / 4, x(i) + bw / 4, ax.y(o.lo), ax.y(o.lo)) + ln(x(i) - bw / 4, x(i) + bw / 4, ax.y(o.hi), ax.y(o.hi))
        + `<rect class="mark" x="${round1(x(i) - bw / 2)}" y="${round1(ax.y(o.q3))}" width="${round1(bw)}" height="${round1(ax.y(o.q1) - ax.y(o.q3))}" rx="4"`
        + ` style="fill:color-mix(in srgb, var(--series_1) 16%, transparent);stroke:var(--series_1);stroke-width:1.5"/>`
        + ln(x(i) - bw / 2, x(i) + bw / 2, ax.y(o.med), ax.y(o.med), 2.5)
        + o.out.map(v => `<circle cx="${round1(x(i))}" cy="${round1(ax.y(v))}" r="3" style="fill:rgb(var(--surface));stroke:var(--series_1);stroke-width:1.5"/>`).join('')))
        .join('') + x_labels(f, g, x), 'Box plot'),
