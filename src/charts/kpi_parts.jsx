/* charts/kpi_parts.jsx: the pieces of the KPI designs: the card shell, the sparkline, the change (delta) line.
   Each card keeps its data (KPIS[i]: title, description, table) for the data overlay; its parts show hover tooltips. */
import { ic } from '../icons/index.js';
import { round1, num, linear, tip_attr } from './viz_math.js';
import { path_of } from './viz_svg.js';
