/* header_tools.jsx: the dashboard's header tools (search, design system, theme, account). Full-screen staff pages reuse
   them; n is an id suffix so their menus stay unique. */
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth } from '../auth/index.js';
import { avatar, theme_btn } from '../ui/index.js';
import { key_hint } from '../feedback/index.js';
import { closed_pop } from './live_slot.jsx';

export function header_tools(n = '') {
  const u = auth.user, r = auth.role(), pct = Math.min(100, Math.round(db.bytes() / cfg.storage_cap * 100));
  return <><button className="icon_btn" data-act="cmdk" aria-label={`Search${key_hint('K') ? ` (${key_hint('K')})` : ''}`}>{ic('search')}</button>
      <a className="icon_btn hidden sm:inline-grid" href="#/ui" aria-label="Design system">{ic('layers')}</a>
      {theme_btn()}
      <div className="relative">
        <button className="ml-1 rounded-full" data-act="pop" data-pop={`pop_account${n}`} aria-label="Account">{avatar(u.name, 'h-9 w-9 text-sm')}</button>
