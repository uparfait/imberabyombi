/* charts/viz_math.js: numbers, seeded demo data and colours shared by every chart and KPI (section 11b).
   Categorical colours --series_1..8 are a validated order (brand orange first); magnitude uses one brand-orange ramp;
   polarity uses blue <-> orange with a grey middle; status colours (ok / warn / bad) only ever mean status. */
import { lorem, cap, esc } from '../lib/index.js';
import { ui } from '../store/index.js';
