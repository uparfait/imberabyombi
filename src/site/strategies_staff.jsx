/* site/strategies_staff.jsx: the Strategies section (six 3D-icon cards), the staff card (portrait, contact links on
   hover; data-team feeds the team filter of the Staff page) and the home Staff section (four cards). */
import { ic, i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export function strategies_sec(full) {
  return (
    <section {...spy_attrs('strategies', full)} className="wrap section"><div className="flex flex-wrap items-end justify-between gap-6">
      {sec_head('Strategies', lorem.t(4), lorem.s())}{full ? null : more('strategies', 'btn_outline')}</div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{['compass', 'layers', 'chart', 'shield', 'users', 'bulb'].map((x, i) => (
        <article key={x} className="card card_hover group p-7" data-reveal="" style={{ '--d': `${(i % 3) * .07}s` }}>{i3(x, 'h-14 w-14', i % 2 ? 'ink' : 'brand')}
          <h3 className="mt-6 text-xl">{lorem.t(3)}</h3><p className="mt-2 text-sm text-muted">{lorem.s(14, 20)}</p></article>
      ))}</div></section>
  );
}

const LINKS_CLS = 'absolute inset-x-3 bottom-3 flex translate-y-2 justify-center gap-2 opacity-0 transition group-hover:translate-y-0 '
  + 'group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100';
