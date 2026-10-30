/* modules/dashboard.jsx: VIEWS.dashboard, the start page: a welcome band (date, name, role), key numbers the role can
   open (they count up after the draw: data-count) and the cards from dashboard_widgets.jsx. */
import { VIEWS } from './views.js';
import { db } from '../store/index.js';
import { auth } from '../auth/index.js';
import { lorem, page_now } from '../lib/index.js';
import { ic, i3, hue_at } from '../icons/index.js';
import { dash_widgets } from './dashboard_widgets.jsx';
import { to } from '../router/index.js';

/* [module, label, icon, collection, filter?]: the numbers a role may open */
const STATS = [['staff', 'Staff', 'users', 'staff'], ['students', 'Students', 'cap', 'students'], ['employees', 'Employees', 'briefcase', 'employees'],
  ['tasks', 'Open tasks', 'tasks', 'tasks', x => x.status !== 'Done'], ['library', 'Books', 'book', 'books'], ['inventory', 'Stock items', 'box', 'inventory'],
  ['events', 'Events', 'star', 'events'], ['parking', 'Cars parked', 'car', 'parking', x => x.status === 'Parked']];

const stat = ([m, l, i, c, f], j) => { const n = f ? db.list(c).filter(f).length : db.list(c).length;
  return <a key={m} href={to(`/admin/${m}`)} className="card card_hover group flex items-center gap-4 p-4 sm:p-5">{i3(i, 'h-11 w-11 sm:h-12 sm:w-12', hue_at(j))}
    <div className="min-w-0"><p className="truncate text-sm text-muted">{l}</p>
      <p className="font-display text-2xl font-bold tabular-nums sm:text-3xl" data-count={n}>0</p></div></a>; };

VIEWS.dashboard = () => {
  const u = auth.user, r = auth.role(), first = u.name.split(' ')[0];
  const stats = STATS.filter(x => auth.can(x[0]));
  const W = dash_widgets(u);
  return <>
    <section aria-label="Welcome" className="flex flex-wrap items-end gap-4">
      <div className="hero_in min-w-0 flex-1"><p className="text-sm text-muted">
