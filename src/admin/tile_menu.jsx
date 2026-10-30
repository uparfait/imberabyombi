/* tile_menu.jsx: "Your modules" style menu: a button that drops a grid of 3D-icon tiles (nested navigation, email designs).
   o = { id, title, icon (false: the button shows its label only), color, label, set, tiles: [{ icon, color, label, on, href } or { icon, color, label, on, attrs: { 'data-act': …, … } }] } */
import { ic, i3, hue_at } from '../icons/index.js';
import { closed_pop } from './live_slot.jsx';

/* a tile's attributes: a props object; an attribute string ('data-act="mail" data-k="x"') is read into one */
const attrs_of = a => typeof a === 'string' ? Object.fromEntries([...a.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]])) : a || {};

const tile = (t, i) => { const Tag = t.href ? 'a' : 'button';
  return <Tag key={i} className={`tile_link ${t.on ? 'active' : ''}`} {...(t.href ? { href: t.href } : attrs_of(t.attrs))} aria-current={t.on ? 'true' : undefined}>
    {i3(t.icon, 'h-11 w-11', t.color || hue_at(i))}<span className="line-clamp-2 w-full leading-tight">{t.label}</span></Tag>; };

export const tile_menu = o => <div className="relative">
  <button className={`tile_trigger ${o.set ? 'is_set' : ''}`} data-act="pop" data-pop={o.id} aria-haspopup="true">
    {o.icon === false ? null : o.set ? i3(o.icon, 'h-7 w-7', o.color) : ic(o.icon || 'grid', 'h-5 w-5')}<span className="truncate">{o.label}</span>{ic('chevD', 'h-4 w-4 shrink-0 text-muted')}</button>
  <div id={o.id} ref={closed_pop()} className="pop tile_pop left-0 w-[24rem] max-w-[calc(100vw-1rem)] p-3" hidden>
    <div className="rounded-3xl bg-fg/5 p-3"><p className="px-2 pb-2 font-display text-lg">{o.title}</p>
      <div className="tile_grid grid grid-cols-3 gap-1">{o.tiles.map(tile)}</div></div></div></div>;
