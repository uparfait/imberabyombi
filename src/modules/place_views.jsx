/* modules/place_views.jsx: the operations and academics modules: Library (books, rentals, declarations), Events (the next
   three as cards, then all), Reservations & inventory (low-stock banner) and Smart parking (live slots + movement log). */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ymd, parse_d, money } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ic, i3 } from '../icons/index.js';
import { badge, bar_cell, tabs, stat_row } from '../ui/index.js';
import { slot_ids } from '../schemas/index.js';
import { crud } from '../table/index.js';

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

const event_card = (e, i) => <article key={e.id} className="card overflow-hidden"><figure className="relative m-0">
  <img src={cfg.img('event-' + i, 640, 360)} alt="" width="640" height="360" loading="lazy" className="aspect-video w-full object-cover" />
  <figcaption className="absolute left-3 top-3 m-0 rounded-2xl bg-surface px-3 py-1.5 text-center leading-none"><time dateTime={e.date}>
    <b className="block font-display text-xl text-fg">{parse_d(e.date).getDate()}</b>
    <small className="text-[11px]">{parse_d(e.date).toLocaleDateString(undefined, { month: 'short' })}</small></time></figcaption></figure>
  <div className="p-5"><div className="flex items-center justify-between gap-2">{badge(e.status)}<span className="text-xs text-muted">{e.start || ''}</span>
    </div><h3 className="mt-3 text-lg">{e.title}</h3>
    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">{ic('pin', 'h-4 w-4')}{e.venue || '—'}</p><div className="mt-4">
      {bar_cell(e.registered, e.capacity)}</div></div></article>;
VIEWS.events = () => {
  const ev = db.list('events').filter(e => e.date >= ymd()).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return <>{ev.length ? <div className="mb-6 grid gap-5 md:grid-cols-3">{ev.map(event_card)}</div> : null}{crud('events', { title: 'All events' })}</>;
};

const decide = (r, can) => can && r.status === 'Pending' ? <><button className="btn btn_soft btn_sm" data-act="res" data-v="Approved" data-id={r.id}>Approve</button>
  <button className="btn btn_ghost btn_sm" data-act="res" data-v="Rejected" data-id={r.id}>Reject</button></> : null;
