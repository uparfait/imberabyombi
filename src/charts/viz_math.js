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
  for (let v = a; v <= Math.ceil(hi / s) * s + s / 2; v += s) out.push(round1(v));
  return out;
};
export const rnd = (a, b) => a + lorem.r() * (b - a);
export const gauss = () => (lorem.r() + lorem.r() + lorem.r() + lorem.r() - 2) * .87;
export const MONTHS = () => Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1).toLocaleDateString(undefined, { month: 'short' }));
export const uwords = n => { const s = new Set(); let g = 0; while (s.size < n && g++ < 500) s.add(cap(lorem.w(1))); return [...s]; };
export const SER = ['Lorem', 'Ipsum', 'Dolor', 'Amet', 'Elit', 'Magna', 'Sed', 'Velit'];
export const scale_color = i => `var(--series_${(i % 8) + 1})`;
/* 0..1 -> light..full brand */
export const sequential = p => `color-mix(in oklab, rgb(var(--brand)) ${Math.round(12 + p * 88)}%, rgb(var(--surface)))`;
export const diverging = t => t >= 0
  ? `color-mix(in oklab, var(--series_1) ${Math.round(Math.min(1, t) * 100)}%, rgb(var(--surface_2)))`
  : `color-mix(in oklab, var(--series_2) ${Math.round(Math.min(1, -t) * 100)}%, rgb(var(--surface_2)))`;
/* the date range scales every amount: 7, 30 or 90 days */
export const RANGE = { 7: .3, 30: 1, 90: 2.6 };
export const MARGIN = () => RANGE[ui.viz_range || 30];
export const fit = (s, px) => { const n = Math.max(1, Math.floor(px / 6.4)); return s.length > n ? s.slice(0, Math.max(1, n - 1)) + '…' : s; };
/* the hover tooltip's data: [title, [value, series name, series index or null], …]. tip_text for SVG strings, tip_attr for JSX */
export const tip_text = (title, rows) => `data-tt="${esc(JSON.stringify([title, ...rows]))}"`;
