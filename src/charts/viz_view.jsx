/* charts/viz_view.jsx: the Charts & KPIs page (/admin/charts): date range, group links, the KPIs, then one card per chart.
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
      <header className="flex items-center gap-1"><h3 className="min-w-0 truncate text-base">{c.t}</h3>{help_tip(c.d, c.t)}</header>
      <div className="viz_plot" data-plot="" dangerouslySetInnerHTML={{ __html: o ? o.svg : '' }}></div>
      <div data-legend="" className="empty:hidden">{o ? o.legend : null}</div>
    </article>
  );
}

/* Each chart redraws when its own box changes width (window resize, sidebar or side panel opening, late CSS) */
export let resize_observer = null;
export const watch = () => {
  resize_observer?.disconnect(); if (!('ResizeObserver' in window)) return;
  let t; resize_observer = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => viz_draw_all(false), 60); });
  qsa('.viz_card [data-plot]').forEach(p => resize_observer.observe(p));
};
before_render(() => resize_observer?.disconnect());   /* the page that draws next watches again if it has charts */

export function charts_view() {
  after_render(() => viz_draw_all()); after_render(watch);
  const by = g => Object.entries(VIZ).filter(([, c]) => c.g === g);
  return (
    <>
      {page_title('Charts & KPIs',
        'Every chart uses the system colours, follows light and dark and shows the exact values on hover. Click a card to see all its data in a table, '
        + 'or one bar, point, slice or row to see only that one. The date range changes every number on the page.')}
      <div className="mb-6 grid gap-3">
        <div className="seg max-w-full justify-self-start overflow-x-auto" role="radiogroup" aria-label="Date range">
          {[['7', '7 days'], ['30', '30 days'], ['90', '90 days']].map(([v, l]) => (
            <label key={v}><input type="radio" className="sr-only" name="viz_range" value={v} data-viz-range="" defaultChecked={String(ui.viz_range || 30) === v} />
              <span className="whitespace-nowrap">{l}</span></label>))}
        </div>
        <nav aria-label="Chart groups" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {VIZGROUPS.map(([k, l]) => <button key={k} className="chip_btn whitespace-nowrap" data-act="scroll" data-to={`viz_${k}`}>{l}</button>)}
        </nav>
      </div>
      <div id="viz_all" className="viz_all grid gap-10">
        <section id="viz_kpi" className="scroll-mt-20"><h2 className="mb-4 text-xl">KPIs</h2><div id="viz_kpis">{kpis()}</div></section>
        {VIZGROUPS.slice(1).map(([g, l]) => (
          <section key={g} id={`viz_${g}`} className="scroll-mt-20"><h2 className="mb-4 text-xl">{l}</h2>
            <div className="room"><div className="viz_grid room_2w grid gap-4">{by(g).map(([k, c]) => <Viz_card key={k} k={k} c={c} />)}</div></div></section>))}
      </div>
    </>
  );
}

/* Date range: every KPI and chart is redrawn for the new range (the KPI grid is keyed by the range, so its count-up restarts) */
export function viz_range(v) { ui.viz_range = +v; rerender(); qsa('#viz_kpis [data-count]').forEach(count_up); }
