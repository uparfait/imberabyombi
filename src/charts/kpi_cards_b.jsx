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
    kpi_card('room_span2', 'Top performers', 'The five highest values this period, ranked.',
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
        <p className="mt-2 text-sm text-muted">Target 400 ms · under target</p></>,
      [['Measure', 'Value'], [['Response time', '320 ms'], ['Target', '400 ms'], ['Result', 'Under target']]]),
    kpi_card('', 'Active right now', 'People using the system this minute, and over the last 12 minutes.',
      <><p className="kpi_value flex items-center gap-2"><span className="kpi_live" aria-hidden="true"></span><span data-count={live[11]}>0</span></p>
        <p className="mt-1 text-sm text-muted">People using the system this minute</p>{spark(live, false, mins, num, 'People')}</>,
      [['Time', 'People'], mins.map((x, i) => [x, num(live[i])])]),
    kpi_card('', 'Tasks done', 'Tasks completed this week out of all tasks due this week.',
      <><div className="kpi_ring"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="32" />
        <circle cx="40" cy="40" r="32" pathLength="100" style={{ strokeDasharray: `${done} 100` }} /></svg><b>{`${done}%`}</b></div>
        <p className="text-center text-sm text-muted">{`${Math.round(ring * 50)} of 50 this week`}</p></>,
      [['Measure', 'Value'], [['Done', Math.round(ring * 50)], ['Total', 50], ['Share', `${done}%`]]]),
    kpi_card('', 'Satisfaction', 'Average rating out of 5 from all reviews this period.',
      <><p className="kpi_value">{`${rate.toFixed(1)} `}<span className="kpi_of">/ 5</span></p>
        <div className="kpi_score" aria-hidden="true">{[0, 1, 2, 3, 4].map(i =>
          <i key={i} style={{ '--p': `${Math.round(Math.max(0, Math.min(1, rate - i)) * 100)}%` }}></i>)}</div>
        <p className="mt-2 text-sm text-muted">{`From ${num(1284 * m)} reviews`}</p></>,
      [['Measure', 'Value'], [['Average rating', `${rate.toFixed(1)} / 5`], ['Reviews', num(1284 * m)]]]),
    kpi_card('', 'Conversion rate', 'Share of visits that became a sign-up, each month. A fall shows in red.',
      <><p className="kpi_value">{pct_fmt(conv[11])}</p>{delta(d_conv)}{spark(conv, true, mo, pct_fmt, 'Conversion rate')}</>,
      [['Month', 'Conversion rate'], mo.map((x, i) => [x, pct_fmt(conv[i])])])
  ];
};
