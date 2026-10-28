/* charts/viz_time_b.js: change over time, part 2: candlestick, slope, Gantt, calendar heatmap.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { esc, fmt_d, ymd, add_d } from '../lib/index.js';
import { round1, linear, ticks, rnd, uwords, sequential, fit, pct, spread, tip_text } from './viz_math.js';
