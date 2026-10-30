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
