/* modules/place_views.jsx: the operations and academics modules: Library (books, rentals, declarations), Events (the next
   three as cards, then all), Reservations & inventory (low-stock banner) and Smart parking (live slots + movement log). */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ymd, parse_d, money } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ic, i3 } from '../icons/index.js';
