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
