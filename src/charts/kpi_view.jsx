/* charts/kpi_view.jsx: the KPI section of the Charts & KPIs page: every KPI design in one dense grid.
   The grid is keyed by the date range, so a new range draws fresh cards (the live count counts up again, as in the reference). */
import { ui } from '../store/index.js';
import { kpi_data } from './kpi_data.js';
