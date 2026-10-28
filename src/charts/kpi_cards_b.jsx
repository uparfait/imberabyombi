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
    kpi_card('sm:col-span-2', 'Top performers', 'The five highest values this period, ranked.',
      <ol className="mt-3 grid gap-1">{lead.map(([n, v], i) => (
        <li key={i} className="kpi_part grid grid-cols-[1.5rem_6rem_1fr_auto] items-center gap-2 py-1 text-sm"
          {...tip_attr(n, [[num(v), 'Value', i ? null : 0], [`#${i + 1}`, 'Rank', null]])}>
          <span className="text-muted">{i + 1}</span><span className="truncate">{n}</span>
          <span className="kpi_track"><i style={{ width: `${Math.round(v / lead[0][1] * 100)}%`, background: i ? 'rgb(var(--muted) / .45)' : 'var(--series_1)' }}></i></span>
          <b className="font-medium tabular-nums">{num(v)}</b></li>))}</ol>,
      [['Name', 'Rank', 'Value'], lead.map(([n, v], i) => [n, i + 1, num(v)])]),
    kpi_card('', 'Response time', 'Average time to answer a request, against the 400 ms target.',
      <><p className="kpi_value">{'320 '}<span className="kpi_of">ms</span></p>
        <div className="kpi_bullet"><i style={{ width: '50%' }}></i><i style={{ width: '25%' }}></i><i style={{ width: '25%' }}></i>
          <b style={{ width: `${Math.round(320 / 600 * 100)}%` }}></b><s style={{ left: `${Math.round(400 / 600 * 100)}%` }}></s></div>
