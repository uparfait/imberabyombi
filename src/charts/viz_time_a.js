/* charts/viz_time_a.js: change over time, part 1: line, area, stacked area, step line, sparklines.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] }.
   seed: the reference's chart key, when the key was renamed (the random demo data is seeded with it, so it stays the same). */
import { esc, lorem } from '../lib/index.js';
