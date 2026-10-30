/* events/attend_side.jsx: attendance under an event's status, compact so the card needs no scrolling: a small QR code
   while it is upcoming, live or recurring (a click shows it full size, with the full link), and beside it how many
   attended (live; it opens their table), Copy link, and Open: the event's other pages in one menu (it opens upward).
   att_count() and the paths are shared with the live screen. */
import { db } from '../store/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { Qr } from './qr.jsx';
