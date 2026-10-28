/* charts/viz_view.jsx: the Charts & KPIs page (#/admin/charts): date range, group links, the KPIs, then one card per chart.
   Charts draw at their real width after the page is on screen (AFTER) and redraw when their own box changes width. */
import { useLayoutEffect, useState } from 'react';
import { qsa, lorem, hash_str } from '../lib/index.js';
import { ui, after_render, before_render, rerender } from '../store/index.js';
import { page_title, help_tip } from '../ui/index.js';
import { count_up } from '../router/index.js';
import { VIZ, VIZGROUPS } from './viz_charts.js';
import { kpis } from './kpi_view.jsx';

/* Draws every chart at its real width; on resize only the charts whose width changed are redrawn. VIZ_OUT keeps each chart's data. */
export const VIZ_OUT = {};
const DRAWN = new Map();   /* chart key -> its card's setter: the card shows VIZ_OUT[key] (SVG string + legend JSX) */
export function viz_draw_all(force = true) {
  qsa('.viz_card[data-chart]').forEach(card => {
    const k = card.dataset.chart, c = VIZ[k], plot = card.querySelector('[data-plot]'), set = DRAWN.get(k); if (!c || !plot || !set) return;
    const w = Math.max(260, Math.floor(plot.clientWidth)); if (!force && plot._w === w) return; plot._w = w; lorem.seed(hash_str((c.seed || k) + (ui.viz_range || 30)));
    let o; try { o = c.f(w); } catch (e) { console.error(e); return; }
    VIZ_OUT[k] = o; set(o); });
}
/* one chart card: the plot is filled with the chart's SVG string, the legend is JSX */
function Viz_card({ k, c }) {
  const [o, set_o] = useState(null);
  useLayoutEffect(() => { DRAWN.set(k, set_o); return () => { if (DRAWN.get(k) === set_o) DRAWN.delete(k); }; }, [k]);
  return (
    <article className="card viz_card" data-chart={k} data-act="viz_open" tabIndex="0" aria-label={`${c.t}: press Enter to see its data in a table`}>
