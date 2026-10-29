/* site/partners_thanks.jsx: partner logos (a shape + a word) in an endless marquee, and the Thanks section
   (brand-coloured block with three testimonials). Both double as the top block of their detail page (full=true). */
import { i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, cap } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export const partner_logo = i => {
  const sh = [<circle cx="16" cy="16" r="13" />, <path d="M16 2 30 16 16 30 2 16z" />, <rect x="3" y="3" width="26" height="26" rx="8" />,
    <path d="M16 2 29 9.5v13L16 30 3 22.5v-13z" />];
  return (
    <div key={i} className="flex shrink-0 items-center gap-3 px-8 text-muted transition hover:text-brand">
      <svg viewBox="0 0 32 32" className="h-9 w-9" fill="currentColor" aria-hidden="true">{sh[i % 4]}
        <circle cx="16" cy="16" r="4.5" style={{ fill: 'rgb(var(--bg))' }} /></svg>
      <span className="font-display text-2xl font-bold tracking-tight">{cap(lorem.w(1))}</span></div>
  );
};

const MASK = 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)';
export function partners_sec(full) {
  const logos = Array.from({ length: 8 }, (_, i) => partner_logo(i));
  return (
    <section {...spy_attrs('partners', full)} className="section"><div className="wrap flex flex-wrap items-end justify-between gap-6">
      {sec_head('Partners', lorem.t(4), lorem.s())}{full ? null : more('partners', 'btn_outline')}</div>
      <div className="marquee mt-12 overflow-hidden" style={{ WebkitMaskImage: MASK, maskImage: MASK }}><div className="marquee_track flex w-max py-2">
        {logos}<div className="flex" aria-hidden="true">{logos}</div></div></div></section>
  );
}

export function thanks_sec(full) {
  return (
    <section {...spy_attrs('thanks', full)} className="wrap section">
      <div className="relative isolate overflow-hidden rounded-4xl bg-brand px-6 py-16 text-center text-white sm:px-14 sm:py-20" data-reveal="">
        <div className="pattern_layer" style={{ '--pc': '255 255 255', '--pa': '.13' }} aria-hidden="true"></div>
        {i3('heart', 'mx-auto h-16 w-16 float', 'pink')}
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl text-white sm:text-6xl">{lorem.t(3)}</h2><p className="mx-auto mt-4 max-w-xl text-white/85">{lorem.p(2)}</p>
        <div className="mt-12 grid gap-4 text-left md:grid-cols-3">{[0, 1, 2].map(i => (
          <figure key={i} className="m-0 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <blockquote className="border-0 bg-transparent p-0 text-base text-white"><p>{lorem.s(12, 18)}</p></blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-white/80"><img src={cfg.face(40 + i * 5)} alt="" width="40" height="40" loading="lazy"
              className="h-10 w-10 rounded-full object-cover" /><span><cite className="block text-white">{lorem.name()}</cite><small>{lorem.t(2)}</small></span></figcaption>
          </figure>
        ))}</div>
        {full ? null : more('thanks', 'btn_ink')}</div></section>
  );
}
