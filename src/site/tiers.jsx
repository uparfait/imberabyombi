/* site/tiers.jsx: the Partners page's partnership tiers (three price cards, the first recommended) and the
   partners table (rows open a detail view through data-act="row"). */
import { ic } from '../icons/index.js';
import { lorem, cap } from '../lib/index.js';
import { tag } from '../ui/index.js';

export function tiers() {
  const t = [['400 GB', 1.29, 4.99], ['5 TB', 4.99, 19.99], ['20 TB', 99.99, null]];
  return (
    <section className="wrap pb-20"><div className="grid gap-5 lg:grid-cols-3">{t.map(([s, p, o], i) => (
      <article key={s} className={`card relative p-7 ${i === 0 ? 'border-2 border-brand' : ''}`} data-reveal="" style={{ '--d': `${i * .08}s` }}>
        {i === 0 ? <p className="text-xs font-semibold text-accent">Recommended</p> : <p className="text-xs">&nbsp;</p>}
        <h3 className="mt-1 text-2xl">{lorem.t(2)}</h3><span className="chip mt-3 bg-surface-2 text-muted">{ic('box', 'h-3.5 w-3.5')}{s}</span>
        <p className="mt-6 flex items-baseline gap-2">{o ? null : <small className="text-muted">From</small>}<data value={p}
          className="font-display text-4xl font-bold text-ok">${p}</data><span className="text-muted">/mo</span>{o ? <s>${o}</s> : null}</p>
