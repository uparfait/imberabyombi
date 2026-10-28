/* charts/viz_math.js: numbers, seeded demo data and colours shared by every chart and KPI (section 11b).
   Categorical colours --series_1..8 are a validated order (brand orange first); magnitude uses one brand-orange ramp;
   polarity uses blue <-> orange with a grey middle; status colours (ok / warn / bad) only ever mean status. */
import { lorem, cap, esc } from '../lib/index.js';
import { ui } from '../store/index.js';

export const round1 = n => Math.round(n * 10) / 10;
export const compact_num = v => { const a = Math.abs(v); return a >= 1e6 ? round1(v / 1e6) + 'M' : a >= 1e3 ? round1(v / 1e3) + 'K' : String(round1(v)); };
export const num = v => Math.round(v).toLocaleString();
export const linear = (d0, d1, a, b) => v => a + (v - d0) / ((d1 - d0) || 1) * (b - a);
export const nice_step = x => { const e = 10 ** Math.floor(Math.log10(x || 1)), f = x / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * e; };
export const ticks = (lo, hi, n = 4) => {
  const s = nice_step((hi - lo) / n), a = Math.floor(lo / s) * s, out = [];
