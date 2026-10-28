/* charts/kpi_data.js: the demo numbers behind the KPI designs, seeded by the date range so they are the same on every draw.
   The random numbers are drawn in the reference's order, so every value matches it. */
import { lorem, hash_str } from '../lib/index.js';
import { ui } from '../store/index.js';
import { rnd, MONTHS, uwords, MARGIN } from './viz_math.js';
