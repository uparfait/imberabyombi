/* site/mission_vision.jsx: the Mission section (3D flag, quote, three points) and the Vision section
   (a dark-themed band with a timeline of years). Both double as the top block of their detail page (full=true). */
import { ic, i3 } from '../icons/index.js';
import { lorem } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export function mission_sec(full) {
  return (
    <section {...spy_attrs('mission', full)} className="wrap section"><div className="card grid gap-10 p-6 sm:p-12 lg:grid-cols-[auto_1fr]" data-reveal="">
      {i3('flag', 'h-20 w-20 sm:h-28 sm:w-28')}
      <div><p className="kicker">{ic('diamond', 'h-3.5 w-3.5')}Mission</p><h2 className="mt-3 text-3xl sm:text-5xl">{lorem.t(5)}</h2>
        <blockquote className="mt-8"><p>{lorem.s(14, 20)}</p><footer className="mt-3 text-sm text-muted"><cite
          className="text-fg">{lorem.name()}</cite>, {lorem.t(2)}</footer></blockquote>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">{[0, 1, 2].map(i => (
          <article key={i} className="rounded-2xl bg-surface-2 p-5"><h3 className="text-base">{lorem.t(2)}</h3><p className="mt-2 text-sm text-muted">{lorem.s()}</p></article>
        ))}</div>
        {full ? null : more('mission')}</div></div></section>
  );
}
export function vision_sec(full) {
  return (
    <section {...spy_attrs('vision', full)} className="theme_band relative isolate overflow-hidden border-y border-line py-20 sm:py-28">
      <div className="pattern_layer" aria-hidden="true"></div>
      <div className="wrap grid gap-14 lg:grid-cols-2"><div>{sec_head('Vision', lorem.t(4), lorem.p(2))}{full ? null : more('vision')}</div>
        <ol className="grid gap-2">{[2027, 2028, 2030, 2032].map((y, i) => (
          <li key={y} className="grid grid-cols-[1.25rem_1fr] gap-5" data-reveal="" style={{ '--d': `${i * .1}s` }}>
            <span className="flex flex-col items-center pt-1.5"><span className="h-4 w-4 rounded-full border-4 border-brand bg-surface dark:bg-ink"></span>
              {i < 3 ? <span className="mt-2 w-px flex-1 bg-line"></span> : null}</span>
