/* charts/kpi_cards_a.jsx: the KPI designs, part 1: big number + sparkline, hero number, goal progress, gauge,
   status list, two-period comparison, mini bar chart. k = kpi_data(); each card registers its table in KPIS. */
import { ic } from '../icons/index.js';
import { compact_num, num, tip_attr } from './viz_math.js';
import { arc } from './viz_svg.js';
import { spark, delta, signed, kpi_card } from './kpi_parts.jsx';
