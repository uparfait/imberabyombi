/* nav_page.jsx: the body of a nested-navigation page: a system's home (header + tiles to its pages) or a page (header,
   key numbers, about, recent activity). The lorem calls run in a fixed order, so the demo text stays the same. */
import { lorem, ymd, add_d, fmt_d } from '../lib/index.js';
import { ic, i3, hue_at } from '../icons/index.js';
import { initials } from '../ui/index.js';

/* o = { routed, title, kicker, node, kids, path, to } from nav_drops */
const head = (o, icon, text, extra = null) => !o.routed
  ? <section className="card flex flex-wrap items-center gap-4 p-5 sm:p-6" aria-label={o.title}>{i3(icon, 'h-14 w-14')}
      <div className="min-w-0 flex-1"><p className="text-sm text-muted">{o.kicker}</p><h3 className="mt-0.5 text-2xl">{o.title}</h3>
        <p className="mt-1 text-muted">{text}</p>{extra}</div></section>   /* the design-system demo: a light header */
  : <section className="flex flex-wrap items-end gap-6" aria-label={o.title}>
      <div className="hero_in min-w-0 flex-1"><p className="text-sm text-muted">{o.kicker}</p><h2 className="mt-1 text-3xl text-fg sm:text-5xl">{o.title}</h2>
        <p className="mt-2 max-w-xl text-muted">{text}</p>{extra}</div>
      <span className="hero_in" style={{ '--d': '.1s' }}>{i3(icon, 'h-16 w-16 sm:h-20 sm:w-20')}</span></section>;

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
  const top = head(o, node.i, lorem.s(), <div className="mt-5 flex flex-wrap gap-2"><button className="btn btn_primary btn_sm">{ic('edit', 'h-4 w-4')}Edit</button>
    <button className="btn btn_glass btn_sm">{ic('link', 'h-4 w-4')}Share</button></div>);
  const nums = [['Open items', String(4 + Math.floor(lorem.r() * 30)), 'tasks'], ['Last updated', fmt_d(ymd(add_d(new Date(), -Math.floor(lorem.r() * 9)))), 'calendar'],
    ['Owner', lorem.name(), 'user']];
  const about = [lorem.p(3), lorem.p(2)], recent = Array.from({ length: 5 }, (_, i) => activity(i));
  return <>{top}<section className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Key numbers">{nums.map(number)}</section>
    <div className="mt-6 grid gap-6 lg:grid-cols-3"><section className="card p-6 lg:col-span-2"><h3 className="text-lg">About</h3>
      <p className="mt-3 text-muted">{about[0]}</p><p className="mt-3 text-muted">{about[1]}</p></section>
    <section className="card overflow-hidden"><h3 className="border-b border-line px-5 py-4 text-lg">Recent activity</h3><ul>{recent}</ul></section></div></>;
}
