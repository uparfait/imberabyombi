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
