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
