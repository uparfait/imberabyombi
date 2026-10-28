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
  const gauge_p = rnd(.45, .92), gauge_c = gauge_p > .85 ? 'rgb(var(--bad))' : gauge_p > .7 ? 'rgb(var(--warn))' : 'var(--series_1)';
  const gauge_s = gauge_p > .85 ? 'Almost full' : gauge_p > .7 ? 'Getting full' : 'Plenty of space';
  const services = [['API', 'ok', 'Operational'], ['Email', 'warn', 'Slower than usual'], ['Storage', 'ok', 'Operational']], o1 = 3480 * m, o2 = 3120 * m;
  const visits = to(trend(), 18400 * m), vmax = Math.max(...visits);
  const src = ['Search', 'Social', 'Email'], split = [rnd(30, 50), rnd(20, 35), rnd(10, 25)], st = split.reduce((a, b) => a + b);
  const share = i => `${Math.round(split[i] / st * 100)}%`;
  const lead = uwords(5).map(k => [k, rnd(20, 100) * m]).sort((a, b) => b[1] - a[1]), live = to(trend(), Math.round(128 * m)).map(Math.round), ring = rnd(.55, .9);
  const rate = rnd(3.9, 4.8), conv = to(trend().reverse(), 3.8 / Math.sqrt(m)), d_conv = -rnd(1, 6);
  const pct_fmt = v => v.toFixed(1) + '%';
  return { m, mo, weeks, mins, users, d_users, rev, d_rev, enr, gauge_p, gauge_c, gauge_s, services, o1, o2, visits, vmax, src, split, share, lead, live, ring, rate,
    conv, d_conv, pct_fmt };
}
