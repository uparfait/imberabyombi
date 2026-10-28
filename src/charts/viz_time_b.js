/* charts/viz_time_b.js: change over time, part 2: candlestick, slope, Gantt, calendar heatmap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, fmt_d, ymd, add_d } from '../lib/index.js';
import { round1, linear, ticks, rnd, uwords, sequential, fit, pct, spread, tip_text } from './viz_math.js';
import { frame, svg, band, x_labels, dot, mark_group, hit_col, hit_row, row_label } from './viz_svg.js';
import { legend, scale_legend } from './viz_legend.jsx';

export const VIZ_TIME_B = {
  candle: { t: 'Candlestick chart', g: 'time', d: 'Open, high, low and close per day. Hollow = up, filled = down.', f(w) {
    let c = 100; const days = Array.from({ length: 20 }, (_, i) => {
