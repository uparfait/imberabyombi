/* charts/kpi_parts.jsx: the pieces of the KPI designs: the card shell, the sparkline, the change (delta) line.
   Each card keeps its data (KPIS[i]: title, description, table) for the data overlay; its parts show hover tooltips. */
import { ic } from '../icons/index.js';
import { round1, num, linear, tip_attr } from './viz_math.js';
import { path_of } from './viz_svg.js';

export const KPIS = [];
/* Sparkline: stretches to the card width; the latest value is a dot (HTML, so it stays round). With labels, every point gets
   an invisible column that shows its value on hover and opens only that point on click. */
export function spark(v, hi = true, labels = null, fmt = num, name = 'Value', w = 120, h = 32) {
  const mx = Math.max(...v), mn = Math.min(...v), x = linear(0, v.length - 1, 2, w - 4), y = linear(mn, mx || 1, h - 4, 4), pts = v.map((n, i) => [x(i), y(n)]);
  const [ex, ey] = pts.at(-1), step = (w - 6) / (v.length - 1);
  return (
    <div className="kpi_spark">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true"><path d={path_of(pts)} /></svg>
      {hi ? <span style={{ left: `${round1(ex / w * 100)}%`, top: `${round1(ey / h * 100)}%` }}></span> : null}
      {labels ? v.map((n, i) => (
        <i key={i} className="kpi_spark_hit" style={{ left: `${round1((x(i) - step / 2) / w * 100)}%`, width: `${round1(step / w * 100)}%` }}
          {...tip_attr(labels[i], [[fmt(n), name, 0]])}></i>
      )) : null}
    </div>
  );
}
/* the change against the previous period: green when it goes the good way (good_up: a rise is good), red otherwise */
export const delta = (d, good_up = true, vs = 'vs last month') => {
  const good = d >= 0 === good_up;
  return (
