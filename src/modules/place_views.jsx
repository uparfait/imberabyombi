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
