/* nav_page.jsx: the body of a nested-navigation page: a system's home (header + tiles to its pages) or a page (header,
   key numbers, about, recent activity). The lorem calls run in a fixed order, so the demo text stays the same. */
import { lorem, ymd, add_d, fmt_d } from '../lib/index.js';
import { ic, i3, hue_at } from '../icons/index.js';
import { initials, help_tip } from '../ui/index.js';

/* o = { routed, title, node, kids, path, to } from nav_drops. The header: icon, title and a help icon whose tooltip holds the
