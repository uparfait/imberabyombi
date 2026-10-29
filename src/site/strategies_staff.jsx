/* site/strategies_staff.jsx: the Strategies section (six 3D-icon cards), the staff card (portrait, contact links on
   hover; data-team feeds the team filter of the Staff page) and the home Staff section (four cards). */
import { ic, i3, hue_at } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';
import { to } from '../router/index.js';

export function strategies_sec(full) {
  return (
    <section {...spy_attrs('strategies', full)} className="wrap section"><div className="flex flex-wrap items-end justify-between gap-6">
      {sec_head('Strategies', lorem.t(4), lorem.s())}{full ? null : more('strategies', 'btn_outline')}</div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{['compass', 'layers', 'chart', 'shield', 'users', 'bulb'].map((x, i) => (
        <article key={x} className="card card_hover group p-7" data-reveal="" style={{ '--d': `${(i % 3) * .07}s` }}>{i3(x, 'h-14 w-14', hue_at(i))}
          <h3 className="mt-6 text-xl">{lorem.t(3)}</h3><p className="mt-2 text-sm text-muted">{lorem.s(14, 20)}</p></article>
      ))}</div></section>
  );
}

const LINKS_CLS = 'absolute inset-x-3 bottom-3 flex translate-y-2 justify-center gap-2 opacity-0 transition group-hover:translate-y-0 '
  + 'group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100';
const LINK_CLS = 'grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-brand hover:text-white';

/* i: position (portrait and reveal delay), team: the team name (the Staff page) or nothing (a random role is shown) */
export const staff_card = (i, team) => {
  const n = lorem.name();
  return (
    <article key={i} className="filter_card group text-center" data-team={team || ''} data-reveal="" style={{ '--d': `${(i % 4) * .06}s` }}>
      <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2"><img src={cfg.face(i * 7 + 3, 320, 400)} alt={`Portrait of ${n}`}
        width="320" height="400" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className={LINKS_CLS}>{['mail', 'globe', 'send'].map(x => (
          <a key={x} href={to('/contact')} className={LINK_CLS} aria-label={`Contact ${n}`}>{ic(x, 'h-4 w-4')}</a>
        ))}</div></div>
      <h3 className="mt-4 text-lg">{n}</h3><p className="text-sm text-muted">{team || lorem.t(2)}</p></article>
  );
};
export function staff_sec() {
  return (
    <section {...spy_attrs('staff')} className="wrap section"><div className="flex flex-wrap items-end justify-between gap-6">
      {sec_head('Staff', lorem.t(3), lorem.s())}{more('staff', 'btn_outline')}</div>
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{[0, 1, 2, 3].map(i => staff_card(i))}</div></section>
  );
}
