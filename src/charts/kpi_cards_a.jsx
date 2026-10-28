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
    kpi_card('sm:col-span-2 xl:col-span-2 kpi_hero', 'Total revenue', 'The one number this page leads with: shown large, once.',
      <><p className="kpi_hero_value">{`$${compact_num(rev)}`}</p>{delta(d_rev, true, 'vs the same period last year')}</>,
      [['Measure', 'Value'], [['Total revenue', '$' + num(rev)], ['Change', signed(d_rev)], ['Compared with', 'The same period last year']]]),
    kpi_card('', 'Enrolment goal', 'Progress towards this year\'s enrolment goal.',
      <><p className="kpi_value">{`${num(enr)} `}<span className="kpi_of">of 1,000</span></p><progress className="mt-3" max="1000" value={Math.min(1000, enr)}></progress>
        <p className="mt-2 text-sm text-muted">{`${num(Math.max(0, 1000 - enr))} to go · ${reached} reached`}</p></>,
      [['Measure', 'Value'], [['Enrolled', num(enr)], ['Goal', '1,000'], ['To go', num(Math.max(0, 1000 - enr))], ['Reached', reached]]]),
    kpi_card('', 'Storage used', 'Share of the storage space in use: amber from 70%, red from 85%.',
      <><div className="kpi_gauge"><svg viewBox="0 0 120 70" aria-hidden="true">
