/* charts/viz_time_b.js: change over time, part 2: candlestick, slope, Gantt, calendar heatmap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, fmt_d, ymd, add_d } from '../lib/index.js';
import { round1, linear, ticks, rnd, uwords, sequential, fit, pct, spread, tip_text } from './viz_math.js';
import { frame, svg, band, x_labels, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';

export const VIZ_TIME_B = {
  candle: { t: 'Candlestick chart', g: 'time', d: 'Open, high, low and close per day. Hollow = up, filled = down.', f(w) {
    let c = 100; const days = Array.from({ length: 20 }, (_, i) => {
      const o = c, cl = o + rnd(-6, 6.5), hi = Math.max(o, cl) + rnd(.5, 4), lo = Math.min(o, cl) - rnd(.5, 4); c = cl;
      return { k: fmt_d(ymd(add_d(new Date(), i - 19))).replace(/,? \d{4}$/, ''), o, c: cl, hi, lo }; });
    const f = frame(w, 250), lo = Math.min(...days.map(d => d.lo)), hi = Math.max(...days.map(d => d.hi)), ts = ticks(lo, hi), y = linear(ts[0], ts.at(-1), f.t + f.ih, f.t);
    const x = band(days.length, f.l, f.w - f.r), bw = Math.min(12, x.bw * .55);
    return { svg: svg(f, ts.map(v => `<line class="grid_line" x1="${f.l}" x2="${f.w - f.r}" y1="${round1(y(v))}" y2="${round1(y(v))}"/>`
        + `<text x="${f.l - 8}" y="${round1(y(v)) + 3.5}" text-anchor="end">${v}</text>`).join('') + days.map((d, i) => {
      const up = d.c >= d.o, col = up ? 'var(--series_2)' : 'var(--series_1)';
      return mark_group(d.k, [[round1(d.o), 'Open', null], [round1(d.hi), 'High', null], [round1(d.lo), 'Low', null], [round1(d.c), 'Close', null]], hit_col(f, x, i)
        + `<line x1="${round1(x(i))}" x2="${round1(x(i))}" y1="${round1(y(d.hi))}" y2="${round1(y(d.lo))}" style="stroke:${col};stroke-width:1.5"/>`
        + `<rect class="mark" x="${round1(x(i) - bw / 2)}" y="${round1(y(Math.max(d.o, d.c)))}" width="${round1(bw)}"`
        + ` height="${round1(Math.max(1.5, Math.abs(y(d.o) - y(d.c))))}" rx="2" style="fill:${up ? 'rgb(var(--surface))' : col};stroke:${col};stroke-width:1.5"/>`); }).join('')
      + x_labels(f, days.map(d => d.k), x), 'Candlestick chart'),
