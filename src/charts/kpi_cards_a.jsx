/* charts/kpi_cards_a.jsx: the KPI designs, part 1: big number + sparkline, hero number, goal progress, gauge,
   status list, two-period comparison, mini bar chart. k = kpi_data(); each card registers its table in KPIS. */
import { ic } from '../icons/index.js';
import { compact_num, num, tip_attr } from './viz_math.js';
import { arc } from './viz_svg.js';
import { spark, delta, signed, kpi_card } from './kpi_parts.jsx';

export const kpi_cards_a = k => {
  const { mo, weeks, users, d_users, rev, d_rev, enr, gauge_p, gauge_c, gauge_s, services, o1, o2, visits, vmax } = k;
  const reached = `${Math.round(Math.min(1, enr / 1000) * 100)}%`, used = Math.round(gauge_p * 100);
  return [
    kpi_card('', 'Active users', 'People who used the system each month, over the last 12 months.',
      <><p className="kpi_value">{compact_num(users[11])}</p>{delta(d_users)}{spark(users, true, mo, num, 'Active users')}</>,
      [['Month', 'Active users'], mo.map((x, i) => [x, num(users[i])])]),
    kpi_card('room_span2 kpi_hero', 'Total revenue', 'The one number this page leads with: shown large, once.',
      <><p className="kpi_hero_value">{`$${compact_num(rev)}`}</p>{delta(d_rev, true, 'vs the same period last year')}</>,
      [['Measure', 'Value'], [['Total revenue', '$' + num(rev)], ['Change', signed(d_rev)], ['Compared with', 'The same period last year']]]),
    kpi_card('', 'Enrolment goal', 'Progress towards this year\'s enrolment goal.',
      <><p className="kpi_value">{`${num(enr)} `}<span className="kpi_of">of 1,000</span></p><progress className="mt-3" max="1000" value={Math.min(1000, enr)}></progress>
        <p className="mt-2 text-sm text-muted">{`${num(Math.max(0, 1000 - enr))} to go · ${reached} reached`}</p></>,
      [['Measure', 'Value'], [['Enrolled', num(enr)], ['Goal', '1,000'], ['To go', num(Math.max(0, 1000 - enr))], ['Reached', reached]]]),
    kpi_card('', 'Storage used', 'Share of the storage space in use: amber from 70%, red from 85%.',
      <><div className="kpi_gauge"><svg viewBox="0 0 120 70" aria-hidden="true">
        <path d={arc(60, 62, 44, 56, -Math.PI / 2, Math.PI / 2)} style={{ fill: `color-mix(in srgb, ${gauge_c} 16%, transparent)` }} />
        <path d={arc(60, 62, 44, 56, -Math.PI / 2, -Math.PI / 2 + Math.PI * gauge_p)} style={{ fill: gauge_c }} /></svg>
        <p className="kpi_value">{`${used}%`}</p></div><p className="text-sm text-muted">{gauge_s}</p></>,
      [['Measure', 'Value'], [['Used', `${used}%`], ['Free', `${100 - used}%`], ['Status', gauge_s]]]),
    kpi_card('', 'Uptime', 'Time the system was available, and the state of each service right now.',
      <><p className="kpi_value">99.95%</p><p className="kpi_status ok">{ic('check', 'h-4 w-4')}Healthy</p>
        <ul className="mt-3 grid gap-1 text-sm">{services.map(([n, s, l]) => (
          <li key={n} className="kpi_part flex items-center justify-between gap-2" {...tip_attr(n, [[l, 'Status', null]])}>
            <span>{n}</span><span className={`kpi_status ${s}`}>{ic(s === 'ok' ? 'check' : 'bell', 'h-3.5 w-3.5')}{l}</span></li>))}</ul></>,
      [['Service', 'Status'], [['All services', 'Healthy · 99.95% uptime'], ...services.map(([n, , l]) => [n, l])]]),
    kpi_card('', 'Orders: this month vs last', 'Orders placed this month compared with last month.',
      <><div className="mt-2 grid grid-cols-2 gap-3">
        <div className="kpi_part" {...tip_attr('This month', [[num(o1), 'Orders', 0]])}>
          <p className="kpi_value">{compact_num(o1)}</p><p className="text-xs text-muted">This month</p></div>
        <div className="kpi_part" {...tip_attr('Last month', [[num(o2), 'Orders', null]])}>
          <p className="kpi_value text-muted">{compact_num(o2)}</p><p className="text-xs text-muted">Last month</p></div></div>{delta(11.5)}</>,
      [['Period', 'Orders'], [['This month', num(o1)], ['Last month', num(o2)], ['Change', '+11.5%']]]),
    kpi_card('', 'Weekly visits', 'Visits per week over the last 12 weeks; this week in colour.',
      <><p className="kpi_value">{compact_num(visits[11])}</p><div className="kpi_bars">{visits.map((n, i) => (
        <i key={i} style={{ height: `${Math.round(n / vmax * 100)}%`, background: i === 11 ? 'var(--series_1)' : 'rgb(var(--muted) / .35)' }}
          {...tip_attr(weeks[i], [[num(n), 'Visits', i === 11 ? 0 : null]])}></i>))}</div>
        <p className="mt-1 text-xs text-muted">Last 12 weeks · this week in colour</p></>,
      [['Week', 'Visits'], weeks.map((x, i) => [x, num(visits[i])])])
  ];
};
