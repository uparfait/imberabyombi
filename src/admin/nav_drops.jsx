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
   pages); every page has its content. State: ui.nav = [System 2 index, System 3 index]. */
/* routed = true: real pages (/admin/nav, /admin/nav/<i-slug>, /admin/nav/4-system-3/<i-slug>), so moving around works like any
   page: address, tab title, Back / Forward, refresh, the top loader. routed = false: the design-system demo, in place. */
function nav_markup(routed) {
  const tree = NAVTREE(), ROOT = 'System 2';
  if (routed) { const q = []; let list = tree;
    for (const x of route.path.split('/').slice(3, 5)) { const i = parseInt(x, 10); if (!list?.[i]) break; q.push(i); list = list[i].c; } ui.nav = q; }
  const p = ui.nav, path = []; { let list = tree; for (const i of p) { const n = list?.[i]; if (!n) break; path.push(n); list = n.c; } }
  const node = path.at(-1), kids = node ? node.c : tree, list_at = l => l ? path[l - 1]?.c : tree;
  const href = idx => { let list = tree; return link_to('/admin/nav' + idx.map(i => { const n = list[i]; list = n.c; return `/${i}-${slug(n.t)}`; }).join('')); };
