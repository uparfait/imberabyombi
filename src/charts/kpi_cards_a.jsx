/* charts/kpi_cards_a.jsx: the KPI designs, part 1: big number + sparkline, hero number, goal progress, gauge,
   status list, two-period comparison, mini bar chart. k = kpi_data(); each card registers its table in KPIS. */
import { ic } from '../icons/index.js';
import { compact_num, num, tip_attr } from './viz_math.js';
import { arc } from './viz_svg.js';
import { spark, delta, signed, kpi_card } from './kpi_parts.jsx';

export const kpi_cards_a = k => {
  const { mo, weeks, users, d_users, rev, d_rev, enr, gauge_p, gauge_c, gauge_s, services, o1, o2, visits, vmax } = k;
  const reached = `${Math.round(Math.min(1, enr / 1000) * 100)}%`, used = Math.round(gauge_p * 100);
