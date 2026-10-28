/* charts/viz_math.js: numbers, seeded demo data and colours shared by every chart and KPI (section 11b).
   Categorical colours --series_1..8 are a validated order (brand orange first); magnitude uses one brand-orange ramp;
   polarity uses blue <-> orange with a grey middle; status colours (ok / warn / bad) only ever mean status. */
import { lorem, cap, esc } from '../lib/index.js';
import { ui } from '../store/index.js';

export const round1 = n => Math.round(n * 10) / 10;
export const compact_num = v => { const a = Math.abs(v); return a >= 1e6 ? round1(v / 1e6) + 'M' : a >= 1e3 ? round1(v / 1e3) + 'K' : String(round1(v)); };
