/* nav_drops.jsx: nested navigation (the menu row and the page of the open system or page) and nav_draw(), which redraws
   the design-system demo in place. */
import { Fragment } from 'react';
import { lorem, hash_str, qs } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { ui, route } from '../store/index.js';
import { NAVTREE, slug } from './nav_tree.js';
import { tile_menu } from './tile_menu.jsx';
import { nav_page } from './nav_page.jsx';
import { Live_slot, redraw_slot } from './live_slot.jsx';
import { to as link_to } from '../router/index.js';

/* ── Nested navigation: three levels in all. Level 1 is this system (its sidebar). Level 2 is "System 2", opened from that
   sidebar: 4 pages and a 5th tile, "System 3". Level 3 is System 3 with its own pages. So there are at most two selections:
   System 2's menu, and System 3's menu once a System 3 page is open. Every system has a home page (brand band + tiles to its
