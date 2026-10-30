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

const tile = (o, it, i) => { const t = o.to(o.path.length, i), Tag = t.href ? 'a' : 'button';
  return <Tag key={i} className="card card_hover group grid justify-items-center gap-3 p-5 text-center" {...(t.href ? { href: t.href } : t.attrs)}>
    {i3(it.i, 'h-12 w-12', hue_at(i))}<span className="line-clamp-2 w-full font-medium leading-tight">{it.t}</span>
    <span className="text-xs text-muted">{it.c ? `System · ${it.c.length} pages` : 'Page'}</span></Tag>; };

const number = ([k, v, i], j) => <div key={k} className="card flex items-center gap-4 p-4 sm:p-5">{i3(i, 'h-11 w-11', hue_at(j + 1))}
  <div className="min-w-0"><p className="truncate text-sm text-muted">{k}</p><p className="truncate font-display text-xl font-bold">{v}</p></div></div>;

const activity = i => { const n = lorem.name();
  return <li key={i} className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0"><span className="nav_avatar">{initials(n)}</span>
    <p className="min-w-0 flex-1 truncate text-sm"><b className="font-medium">{n}</b> <span className="text-muted">{lorem.s(3, 5).replace(/\.$/, '').toLowerCase()}</span></p>
    <time className="shrink-0 text-xs text-muted">{`${i + 1} h`}</time></li>; };

export function nav_page(o) {
  const { title, node, kids } = o;
  if (kids) return <>{head(o, node ? node.i : 'layers', lorem.p(1))}
    <section className="mt-6" aria-label={`In ${title}`}><h3 className="mb-3 text-lg">{`In ${title}`}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">{kids.map((it, i) => tile(o, it, i))}</div></section></>;
  const top = head(o, node.i, lorem.s(), <div className="flex flex-wrap gap-2"><button className="btn btn_primary btn_sm">{ic('edit', 'h-4 w-4')}Edit</button>
    <button className="btn btn_glass btn_sm">{ic('link', 'h-4 w-4')}Share</button></div>);
