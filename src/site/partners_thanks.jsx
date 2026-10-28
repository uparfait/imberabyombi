/* site/partners_thanks.jsx: partner logos (a shape + a word) in an endless marquee, and the Thanks section
   (brand-coloured block with three testimonials). Both double as the top block of their detail page (full=true). */
import { i3 } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { lorem, cap } from '../lib/index.js';
import { sec_head, more, spy_attrs } from './site_bits.jsx';

export const partner_logo = i => {
