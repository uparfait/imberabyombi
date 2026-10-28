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
