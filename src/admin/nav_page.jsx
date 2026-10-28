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
        <p className="mt-1 text-muted">{text}</p>{extra}</div></section>   /* the design-system demo: a light header */
  : <section aria-label={o.title}>{hero_shell(<div className="relative flex flex-wrap items-end gap-6 px-6 pb-16 pt-8 sm:px-10 sm:pb-20">
      <div className="hero_in min-w-0 flex-1"><p className="text-sm text-fg/60">{o.kicker}</p><h2 className="mt-1 text-3xl text-fg sm:text-5xl">{o.title}</h2>
        <p className="mt-2 max-w-xl text-fg/70">{text}</p>{extra}</div>
      <span className="hero_in" style={{ '--d': '.1s' }}>{i3(icon, 'h-16 w-16 sm:h-20 sm:w-20')}</span></div>)}</section>;

const tile = (o, it, i) => { const t = o.to(o.path.length, i), Tag = t.href ? 'a' : 'button';
  return <Tag key={i} className="card card_hover group grid justify-items-center gap-3 p-5 text-center" {...(t.href ? { href: t.href } : t.attrs)}>
    {i3(it.i, 'h-12 w-12')}<span className="line-clamp-2 w-full font-medium leading-tight">{it.t}</span>
    <span className="text-xs text-muted">{it.c ? `System · ${it.c.length} pages` : 'Page'}</span></Tag>; };

const number = ([k, v, i]) => <div key={k} className="card flex items-center gap-4 p-4 sm:p-5">{i3(i, 'h-11 w-11')}
  <div className="min-w-0"><p className="truncate text-sm text-muted">{k}</p><p className="truncate font-display text-xl font-bold">{v}</p></div></div>;

const activity = i => { const n = lorem.name();
  return <li key={i} className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0"><span className="nav_avatar">{initials(n)}</span>
    <p className="min-w-0 flex-1 truncate text-sm"><b className="font-medium">{n}</b> <span className="text-muted">{lorem.s(3, 5).replace(/\.$/, '').toLowerCase()}</span></p>
    <time className="shrink-0 text-xs text-muted">{`${i + 1} h`}</time></li>; };
