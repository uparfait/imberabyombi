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
        <a href="#/contact" className="btn btn_primary mt-6 w-full">Become a partner</a>
        <ul className="mt-6 grid gap-3 text-sm">{[0, 1, 2, 3].map(j => (
          <li key={j} className="flex gap-3">{ic('check', 'mt-0.5 h-4 w-4 shrink-0 text-accent')}<span>{lorem.s(5, 9)}</span></li>
        ))}</ul></article>
    ))}</div>
      <div className="card mt-10 overflow-x-auto p-2"><table><caption className="px-4 pt-3">{lorem.t(3)}</caption>
        <colgroup><col /><col /><col className="hl" /><col /></colgroup>
        <thead><tr><th scope="col">Partner</th><th scope="col">Since</th><th scope="col">Tier</th><th scope="col" className="text-right">Projects</th></tr></thead>
        <tbody>{[0, 1, 2, 3, 4].map(i => {
          const n = cap(lorem.w(1));
          return (
            <tr key={i} data-act="row" data-title={n} tabIndex={0} className="cursor-pointer">
              <th scope="row" className="bg-transparent text-sm font-semibold text-fg">{n}</th><td><time dateTime={2019 + i}>{2019 + i}</time></td>
              <td>{tag(lorem.t(1))}</td><td className="text-right tabular-nums">{lorem.int(2, 30)}</td></tr>
