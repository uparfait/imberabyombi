/* nav_tree.js: the nested-navigation tree (System 2: 4 pages and System 3, which has 14 pages of its own), built once
   from seeded lorem, and slug() for the page addresses (#/admin/nav/4-system-3/…). */
import { lorem } from '../lib/index.js';

const ICONS_2 = ['layers', 'users', 'box', 'chart'];
const ICONS_3 = ['note', 'calendar', 'flag', 'star', 'target', 'bulb', 'compass', 'heart', 'globe', 'send', 'book', 'mail', 'pin', 'coin'];
export const NAVTREE = (() => { let t; return () => t || (lorem.seed(808), t = [...Array.from({ length: 4 }, (_, a) => ({ t: lorem.t(2), i: ICONS_2[a] })),
  { t: 'System 3', i: 'grid', c: Array.from({ length: 14 }, (_, a) => ({ t: lorem.t(2), i: ICONS_3[a] })) }]); })();
export const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
