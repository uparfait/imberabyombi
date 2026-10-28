/* charts/kpi_data.js: the demo numbers behind the KPI designs, seeded by the date range so they are the same on every draw.
   The random numbers are drawn in the reference's order, so every value matches it. */
import { lorem, hash_str } from '../lib/index.js';
import { ui } from '../store/index.js';
import { rnd, MONTHS, uwords, MARGIN } from './viz_math.js';
import { KPIS } from './kpi_parts.jsx';

export function kpi_data() {
  lorem.seed(hash_str('kpi' + (ui.viz_range || 30))); KPIS.length = 0;
  const m = MARGIN(), mo = MONTHS(), trend = () => Array.from({ length: 12 }, (_, i) => 40 + i * 2 + rnd(-8, 8)), to = (t, end) => t.map(v => v / t.at(-1) * end);
  const weeks = Array.from({ length: 12 }, (_, i) => i === 11 ? 'This week' : `${11 - i} weeks ago`);
  const mins = Array.from({ length: 12 }, (_, i) => i === 11 ? 'Now' : `${11 - i} min ago`);
  const users = to(trend(), 12900 * m), d_users = rnd(2, 14), rev = 4.2e6 * m, d_rev = rnd(4, 18), enr = Math.round(842 * Math.min(1.15, m));
