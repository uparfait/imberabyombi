/* nav_page.jsx: the body of a nested-navigation page: a system's home (header + tiles to its pages) or a page (header,
   key numbers, about, recent activity). The lorem calls run in the reference's order. */
import { lorem, ymd, add_d, fmt_d } from '../lib/index.js';
import { ic, i3 } from '../icons/index.js';
import { initials } from '../ui/index.js';
import { hero_shell } from '../site/index.js';

/* o = { routed, title, kicker, node, kids, path, to } from nav_drops */
const head = (o, icon, text, extra = null) => !o.routed
  ? <section className="card flex flex-wrap items-center gap-4 p-5 sm:p-6" aria-label={o.title}>{i3(icon, 'h-14 w-14')}
      <div className="min-w-0 flex-1"><p className="text-sm text-muted">{o.kicker}</p><h3 className="mt-0.5 text-2xl">{o.title}</h3>
