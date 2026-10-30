/* charts/kpi_view.jsx: the KPI section of the Charts & KPIs page: every KPI design in one dense grid, 1, 2 or 4 across
   The grid is keyed by the date range, so a new range draws fresh cards (the live count counts up again). */
import { ui } from '../store/index.js';
import { kpi_data } from './kpi_data.js';
import { kpi_cards_a } from './kpi_cards_a.jsx';
import { kpi_cards_b } from './kpi_cards_b.jsx';

export function kpis() {
  const k = kpi_data();
  return (
    <div key={ui.viz_range || 30} className="grid grid-flow-row-dense gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpi_cards_a(k)}
      {kpi_cards_b(k)}
    </div>
  );
}
