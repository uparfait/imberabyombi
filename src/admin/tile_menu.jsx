/* tile_menu.jsx: "Your modules" style menu: a button that drops a grid of 3D-icon tiles (nested navigation, email designs).
   o = { id, title, icon, label, set, tiles: [{ icon, label, on, href } or { icon, label, on, attrs: { 'data-act': …, … } }] } */
import { ic, i3 } from '../icons/index.js';
import { closed_pop } from './live_slot.jsx';

/* a tile's attributes: a props object; a reference-style string ('data-act="mail" data-k="x"') is read into one */
const attrs_of = a => typeof a === 'string' ? Object.fromEntries([...a.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]])) : a || {};

const tile = (t, i) => { const Tag = t.href ? 'a' : 'button';
  return <Tag key={i} className={`tile_link ${t.on ? 'active' : ''}`} {...(t.href ? { href: t.href } : attrs_of(t.attrs))} aria-current={t.on ? 'true' : undefined}>
    {i3(t.icon, 'h-11 w-11')}<span className="line-clamp-2 w-full leading-tight">{t.label}</span></Tag>; };

export const tile_menu = o => <div className="relative">
  <button className={`tile_trigger ${o.set ? 'is_set' : ''}`} data-act="pop" data-pop={o.id} aria-haspopup="true">
    {o.set ? i3(o.icon, 'h-7 w-7') : ic(o.icon || 'grid', 'h-5 w-5')}<span className="truncate">{o.label}</span>{ic('chevD', 'h-4 w-4 shrink-0 text-muted')}</button>
