/* nav_page.jsx: the body of a nested-navigation page: a system's home (header + tiles to its pages) or a page (header,
   key numbers, about, recent activity). The lorem calls run in a fixed order, so the demo text stays the same. */
import { lorem, ymd, add_d, fmt_d } from '../lib/index.js';
import { ic, i3, hue_at } from '../icons/index.js';
import { initials, help_tip } from '../ui/index.js';

/* o = { routed, title, node, kids, path, to } from nav_drops. The header: icon, title and a help icon whose tooltip holds the
   description (no line above the title, no paragraph under it), then the page's buttons on the right. */
const head = (o, icon, text, extra = null) => { const T = o.routed ? 'h2' : 'h3';
  return <section className={`flex flex-wrap items-center gap-3 ${o.routed ? 'hero_in' : 'card p-4 sm:p-5'}`} aria-label={o.title}>{i3(icon, 'h-11 w-11')}
    <div className="flex min-w-0 flex-1 items-center gap-1"><T className="min-w-0 font-display text-2xl font-medium tracking-tight [overflow-wrap:anywhere]">{o.title}</T>
      {help_tip(text, o.title)}</div>{extra}</section>; };
