/* modules/place_views.jsx: the operations and academics modules: Library (books, rentals, declarations), Events (the next
   three as cards, then every event by where it stands: Live, Upcoming, Recurring, Postponed, Cancelled, Past; one event
   opens on its own page, /admin/events/<id>), Reservations & inventory (low-stock banner) and Smart parking. */
import { VIEWS } from './views.js';
import { db, ui, route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ymd, parse_d, money } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ic, i3 } from '../icons/index.js';
import { badge, bar_cell, tabs, stat_row } from '../ui/index.js';
import { slot_ids } from '../schemas/index.js';
import { crud } from '../table/index.js';
import { to, go } from '../router/index.js';
import { event_page, ev_state, in_state, EV_STATES } from '../events/index.js';

const returned = (r, can) => can && r.status === 'Rented' ? <button className="btn btn_soft btn_sm" data-act="return" data-id={r.id}>Mark returned</button> : null;
VIEWS.library = () => {
  const t = ui.tab.lib || 'books', b = db.list('books'), rn = db.list('rentals');
  const out = rn.filter(r => r.status === 'Rented'), over = out.filter(r => r.due < ymd()).length;
  return <>{stat_row([['Titles', b.length, 'book'], ['Copies', b.reduce((a, x) => a + (+x.copies || 0), 0), 'layers', 'ink'], ['On loan', out.length, 'arrow_r', 'info'],
      ['Overdue', over, 'clock', 'bad'], ['Declared lost', db.list('declarations').filter(d => d.type === 'Lost').length, 'flag', 'warn']])}
    {tabs('lib', [['books', 'Books'], ['rentals', 'Rentals', out.length], ['decl', 'Declarations']], t)}
    {t === 'books' ? crud('books', { title: 'Registered books' })
      : t === 'rentals' ? crud('rentals', { title: 'Rentals', acts: returned }) : crud('declarations', { title: 'Declarations' })}</>;
};

const event_card = (e, i) => <a key={e.id} href={to('/admin/events/' + e.id)} className="card ev_tile overflow-hidden"><figure className="relative m-0">
  <img src={cfg.img('event-' + i, 640, 360)} alt="" width="640" height="360" loading="lazy" className="aspect-video w-full object-cover" />
  <figcaption className="absolute left-3 top-3 m-0 rounded-2xl bg-surface px-3 py-1.5 text-center leading-none"><time dateTime={e.date}>
    <b className="block font-display text-xl text-fg">{parse_d(e.date).getDate()}</b>
    <small className="text-[0.6875rem]">{parse_d(e.date).toLocaleDateString(undefined, { month: 'short' })}</small></time></figcaption></figure>
  <div className="p-5"><div className="flex items-center justify-between gap-2">{badge(ev_state(e))}<span className="text-xs text-muted">{e.start || ''}</span>
    </div><h3 className="mt-3 text-lg">{e.title}</h3>
    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">{ic('pin', 'h-4 w-4')}{e.venue || '—'}</p><div className="mt-4">
      {bar_cell(e.registered, e.capacity)}</div></div></a>;
VIEWS.events = () => {
  const id = route.path.split('/')[3]; if (id) return event_page(id);
  const all = db.list('events'), t = ui.tab.ev || 'all', n = s => all.filter(in_state(s)).length;
  const next = all.filter(e => ev_state(e) === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return <>{t === 'all' && next.length ? <div className="mb-6 grid gap-5 md:grid-cols-3">{next.map(event_card)}</div> : null}
};

const decide = (r, can) => can && r.status === 'Pending' ? <><button className="btn btn_soft btn_sm" data-act="res" data-v="Approved" data-id={r.id}>Approve</button>
  <button className="btn btn_ghost btn_sm" data-act="res" data-v="Rejected" data-id={r.id}>Reject</button></> : null;
VIEWS.inventory = () => {
  const t = ui.tab.inv || 'res', low = db.list('inventory').filter(i => +i.qty < +i.min);
  const banner = low.length ? <div className="mb-6 flex items-start gap-4 rounded-3xl border border-warn/30 bg-warn/10 p-5">{i3('box', 'h-11 w-11', 'warn')}
    <div><h2 className="text-base">{`${low.length} item${low.length > 1 ? 's are' : ' is'} below minimum stock`}</h2><p className="mt-1 text-sm text-muted">
      {low.map(i => i.item).join(', ')}</p></div></div> : null;
  return <>{tabs('inv', [['res', 'Reservations', db.list('reservations').filter(r => r.status === 'Pending').length], ['stock', 'Inventory', low.length]], t)}
    {t === 'res' ? crud('reservations', { title: 'Reservations', acts: decide }) : <>{banner}{crud('inventory', { title: 'Stock' })}</>}</>;
};

const check_out = (r, c) => c && r.status === 'Parked' ? <button className="btn btn_soft btn_sm" data-act="park_out" data-id={r.id}>Check out</button> : null;
VIEWS.parking = () => {
  const logs = db.list('parking'), parked = logs.filter(l => l.status === 'Parked'), occ = Object.fromEntries(parked.map(p => [p.slot, p]));
  const N = cfg.parking_slots, can = auth.can('parking', 2);
  const rev = logs.filter(l => l.status === 'Exited' && String(l.out).startsWith(ymd())).reduce((a, l) => a + (+l.fee || 0), 0);
  const tile = s => { const p = occ[s], a = can ? { 'data-act': p ? 'park_out' : 'park_in', 'data-id': p?.id || '', 'data-slot': s } : { disabled: true };
    return <button key={s} className={`tile ${p ? 'is_on' : ''}`} {...a} aria-label={`Slot ${s}, ${p ? 'occupied by ' + p.plate : 'free'}`}>
      <span className="text-xs font-semibold">{s}</span>
      {p ? <>{ic('car', 'h-6 w-6')}<span className="w-full truncate font-mono text-[0.6875rem]">{p.plate}</span>
        </> : <span className="text-[0.6875rem] text-muted">Free</span>}</button>; };
  return <>{stat_row([['Capacity', N, 'car', 'ink'], ['Occupied', parked.length, 'car'], ['Free', N - parked.length, 'check', 'ok'],
      ['Revenue today', money(rev), 'coin', 'info']])}
    <section className="card mb-6 p-5"><header className="mb-5 flex flex-wrap items-center gap-3"><h2 className="text-lg">Live slots</h2>
      <meter className="w-40" min="0" max={N} low={N * .6} high={N * .85} optimum="0" value={parked.length} aria-label="Occupancy"></meter>
        <span className="text-sm text-muted">{`${Math.round(parked.length / N * 100)}% full`}</span>
      {can ? <button className="btn btn_primary btn_sm ml-auto" data-act="park_in">{ic('plus', 'h-4 w-4')}Check in a car</button> : null}</header>
        <div id="tiles_msg" className="mb-4 empty:hidden"></div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 xl:grid-cols-8">{slot_ids().map(tile)}</div></section>
    {crud('parking', { title: 'Movement log', acts: check_out })}</>;
};
