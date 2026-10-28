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
