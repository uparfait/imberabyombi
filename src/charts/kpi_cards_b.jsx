/* charts/kpi_cards_b.jsx: the KPI designs, part 2: share split, leaderboard, bullet against a target, live count,
   progress ring, rating, falling rate. k = kpi_data(); each card registers its table in KPIS. */
import { num, scale_color, tip_attr } from './viz_math.js';
import { spark, delta, kpi_card } from './kpi_parts.jsx';

export const kpi_cards_b = k => {
  const { m, mo, mins, src, split, share, lead, live, ring, rate, conv, d_conv, pct_fmt } = k;
  const done = Math.round(ring * 100);
  return [
    kpi_card('', 'Traffic sources', 'Where visitors came from, as a share of all visits.',
      <><div className="kpi_split">{split.map((v, i) => <i key={i} style={{ flex: v, background: scale_color(i) }} {...tip_attr(src[i], [[share(i), 'Share', i]])}></i>)}</div>
        <ul className="mt-3 grid gap-0.5 text-sm">{src.map((n, i) => (
          <li key={n} className="kpi_part flex items-center gap-2" {...tip_attr(n, [[share(i), 'Share', i]])}>
            <span className="legend_rect" style={{ '--c': scale_color(i) }}></span>{n}<b className="ml-auto font-medium">{share(i)}</b></li>))}</ul></>,
      [['Source', 'Share'], src.map((n, i) => [n, share(i)])]),
