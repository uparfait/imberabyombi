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
