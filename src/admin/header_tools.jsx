/* header_tools.jsx: the dashboard's header tools (search, design system, notifications, theme, account). Full-screen staff pages reuse
   them, or just account_menu() (O-Doc Sign's top bar); n is an id suffix so their menus stay unique. The account menu is
   drawn at the top of the page (a portal to <body>, placed under its button by place_tile), so nothing covers it.
   RAIL: the side panels the rail opens (admin_shell.jsx); below 768 px, where the rail is hidden, they are in the
   account menu, under its other items. */
import { createPortal } from 'react-dom';
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth } from '../auth/index.js';
import { avatar, theme_btn, help_tip } from '../ui/index.js';
import { key_hint } from '../feedback/index.js';
import { closed_pop } from './live_slot.jsx';
import { to } from '../router/index.js';
import { notice_menu } from './notice_menu.jsx';

export const RAIL = [['notes', 'bulb', 'text-warn', 'Notes'], ['tasks', 'check', 'text-info', 'My tasks'], ['help', 'help', 'text-ok', 'Help']];

export const header_tools = (n = '') => <><button className="icon_btn" data-act="cmdk" aria-label={`Search${key_hint('K') ? ` (${key_hint('K')})` : ''}`}>{ic('search')}</button>
  <a className="icon_btn hidden sm:inline-grid" href={to('/ui')} aria-label="Design system">{ic('layers')}</a>
  {notice_menu(n)}{theme_btn()}{account_menu(n, true)}</>;

/* the signed-in person's avatar and its menu (name and email, settings, the design system on small screens where its
   header button is hidden, public website, the side panels on small screens when rail is set, a small "Allow text
   selection" switch with its help icon, storage used, and Sign out last of all) */
export function account_menu(n = '', rail = false) {
  const u = auth.user, pct = Math.min(100, Math.round(db.bytes() / cfg.storage_cap * 100));
  return <div className="relative">
        <button className="ml-1 rounded-full" data-act="pop" data-pop={`pop_account${n}`} aria-label="Account">{avatar(u.name, 'h-9 w-9 text-sm')}</button>
        {createPortal(<div id={`pop_account${n}`} ref={closed_pop()} className="pop pop_fixed w-[21rem] max-w-[calc(100vw-1rem)] p-3" hidden>
          <div className="flex items-center gap-3 rounded-3xl bg-surface-2 p-4">{avatar(u.name, 'h-14 w-14 text-lg')}
            <div className="min-w-0"><p className="truncate font-semibold">{u.name}</p><p className="truncate text-sm text-muted">{u.email}</p></div></div>
          <div className="mt-2 grid gap-0.5"><a href={to('/admin/settings')} className="menu_item">{ic('sliders', 'h-4 w-4 text-muted')}Settings</a>
            <a href={to('/')} className="menu_item">{ic('globe', 'h-4 w-4 text-muted')}Public website</a></div>
          {rail ? <div className="mt-2 grid gap-0.5 border-t border-line pt-2 md:hidden">{RAIL.map(([k, i, c, l]) =>
            <button key={k} className="menu_item" data-act="panel" data-k={k}>{ic(i, `h-4 w-4 ${c}`)}{l}</button>)}
            <button className="menu_item" data-act="cmdk">{ic('plus', 'h-4 w-4 text-muted')}Go to</button></div> : null}
          <label className="menu_item menu_item_sm mt-1 justify-between"><span className="flex items-center gap-0.5">Allow text selection
            {help_tip('Lets you select and copy any text on these pages. When it is off, only fields, tables, code and notes can be '
              + 'selected, so taps and drags stay clean. Your choice is remembered on this device.', 'text selection')}</span>
            <input type="checkbox" role="switch" data-allow-select defaultChecked={document.documentElement.classList.contains('allow_select')} /></label>
          <div className="mt-2 rounded-2xl bg-surface-2 p-4">
            <p className="flex items-center gap-2 text-sm">{ic('box', 'h-4 w-4 text-muted')}{`${pct}% of 5 MB browser storage used`}</p>
            <progress className="mt-2" max="100" value={pct}></progress></div>
          <p className="mt-3 text-center text-xs text-muted">
            <a href={to('/sitemap')} className="hover:text-accent">Privacy Policy</a>, <a href={to('/sitemap')} className="hover:text-accent">Terms of Service</a></p>
          <div className="mt-2 border-t border-line pt-2">
            <button className="menu_item menu_danger w-full" data-act="logout">{ic('logout', 'h-4 w-4 text-muted')}Sign out</button></div></div>, document.body)}</div>;
}
