/* site/pages.jsx: the home page (every section in order) and the detail pages: config-driven, one renderer.
   A detail page = page hero (breadcrumb, title, lead, 3D icon) + its top block (PAGES[k].top) + the long text. */
import { ic, i3 } from '../icons/index.js';
import { lorem, hash_str } from '../lib/index.js';
import { sitemap } from '../emails/index.js';
import { hero_shell } from './site_bits.jsx';
