/* header_tools.jsx: the dashboard's header tools (search, design system, theme, account). Full-screen staff pages reuse
   them, or just account_menu() (O-Doc Sign's top bar); n is an id suffix so their menus stay unique. */
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth } from '../auth/index.js';
import { avatar, theme_btn } from '../ui/index.js';
import { key_hint } from '../feedback/index.js';
import { closed_pop } from './live_slot.jsx';
import { to } from '../router/index.js';

export const header_tools = (n = '') => <><button className="icon_btn" data-act="cmdk" aria-label={`Search${key_hint('K') ? ` (${key_hint('K')})` : ''}`}>{ic('search')}</button>
  <a className="icon_btn hidden sm:inline-grid" href={to('/ui')} aria-label="Design system">{ic('layers')}</a>
  {theme_btn()}{account_menu(n)}</>;

/* the signed-in person's avatar and its menu (who, settings, public website, sign out, storage used) */
export function account_menu(n = '') {
  const u = auth.user, r = auth.role(), pct = Math.min(100, Math.round(db.bytes() / cfg.storage_cap * 100));
  return <div className="relative">
        <button className="ml-1 rounded-full" data-act="pop" data-pop={`pop_account${n}`} aria-label="Account">{avatar(u.name, 'h-9 w-9 text-sm')}</button>
        <div id={`pop_account${n}`} ref={closed_pop()} className="pop right-0 w-[21rem] max-w-[calc(100vw-1rem)] p-3" hidden>
          <div className="flex items-center gap-3 rounded-3xl bg-surface-2 p-4">{avatar(u.name, 'h-14 w-14 text-lg')}
            <div className="min-w-0"><p className="truncate font-semibold">{u.name}</p><p className="truncate text-sm text-muted">{u.email}</p>
              <span className="chip mt-1 bg-brand/15 text-accent">{r.name}</span></div></div>
