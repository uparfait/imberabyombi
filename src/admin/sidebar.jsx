/* sidebar.jsx: the admin sidebar: logo row, Create menu, mini calendar, module links by group, footer links.
   side_spin(link) shows the loading spinner in a clicked sidebar link until the next page draws. */
import { uniq } from '../lib/index.js';
import { ic, mark3d } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { auth, MODS } from '../auth/index.js';
import { spinner } from '../feedback/index.js';
import { side_section } from './side_section.jsx';
import { mini_cal } from './calendar_items.jsx';
import { Live_slot, redraw_slot, closed_pop } from './live_slot.jsx';
import { to } from '../router/index.js';

/* the Create menu: [module, collection, label, icon], shown when the role can manage the module */
export const CREATE = [['tasks', 'tasks', 'New task', 'tasks'], ['calendar', 'activities', 'New activity', 'calendar'], ['students', 'students', 'Register student', 'cap'],
  ['library', 'books', 'Register book', 'book'], ['events', 'events', 'New event', 'star'], ['inventory', 'reservations', 'New reservation', 'box'],
  ['parking', 'parking', 'Check in a car', 'car'], ['staff', 'staff', 'New staff member', 'users']];

const SIDE = { busy: null };   /* href of the clicked link whose page is loading */
const link = (m, mod) => { const on = m.k === mod, href = to(`/admin/${m.k}`), busy = SIDE.busy === href;
  return <li key={m.k}><a href={href} className={`side_link ${on ? 'active' : ''}`} aria-current={on ? 'page' : undefined} aria-busy={busy ? 'true' : undefined} data-tip={m.d}>
    {busy ? spinner('side_spin') : ic(m.i)}<span className="truncate">{m.l}</span></a></li>; };
const groups = mod => uniq(MODS.map(m => m.g)).map(g => { const items = MODS.filter(m => m.g === g && auth.can(m.k)); if (!items.length) return null;
  return side_section(g, g, <ul className="mt-0.5 grid gap-0.5">{items.map(m => link(m, mod))}</ul>); });

/* Sidebar: the clicked link shows the spinner in place of its icon while the page loads (the redraw brings the icon back) */
export const side_spin = a => { SIDE.busy = a.getAttribute('href'); redraw_slot('side_nav'); };

const create_menu = create => <div className="relative">
  <button className="btn h-14 gap-3 rounded-2xl border border-line bg-surface px-5 text-fg shadow-soft hover:bg-surface-2"
    data-act="pop" data-pop="pop_create" aria-haspopup="menu">
    {ic('plus', 'h-6 w-6')}Create{ic('chevD', 'h-4 w-4 text-muted')}</button>
  <div id="pop_create" ref={closed_pop()} className="pop left-0 w-64" role="menu" hidden>{create.map(([m, c, l, i]) =>
    <button key={m} className="menu_item" role="menuitem" data-act="create" data-mod={m} data-col={c}>{ic(i, 'h-4 w-4 text-muted')}{l}</button>)}</div></div>;

export function sidebar(mod) {
  const create = CREATE.filter(([m]) => auth.can(m, 2)); SIDE.busy = null;
  /* Top row (same height as the header): logo and web name (trimmed, never wider than the sidebar), close-sidebar button at the end */
  return <><div className="flex h-16 shrink-0 items-center gap-1.5 pl-4 pr-3">
    <a href={to('/')} className="flex min-w-0 flex-1 items-center gap-2" aria-label={`${cfg.name}, home`}>{mark3d('#', 'h-8 w-8')}
      <span className="truncate font-display text-lg font-extrabold tracking-wide"><span className="text-brand">{cfg.logo[0]}</span>{cfg.logo[1]}</span></a>
    <button className="icon_btn" data-act="side" aria-label="Close sidebar">{ic('sideClose')}</button></div>
  <div id="sidebar_scroll" className="scroll_hover flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-3 pt-1" data-chain="">
  {create.length ? create_menu(create) : null}
