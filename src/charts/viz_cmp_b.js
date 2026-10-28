/* charts/viz_cmp_b.js: comparison charts, part 2: lollipop, dumbbell, bullet, waterfall.
   Each chart: t (title), g (group), d (description), f(width) -> { svg, legend?, table: [head, rows] } */
import { round1, num, linear, rnd, uwords, MARGIN } from './viz_math.js';
