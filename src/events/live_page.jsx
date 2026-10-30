/* events/live_page.jsx: the live screen of an event or activity (/admin/events/<id>/live, /admin/calendar/<id>/live): the
   whole window, no sidebar, to show while it runs. The agenda item running now, large, with its presenter and how far it
   has got; the agenda (done, now, next); the attendance QR code, large, with the live count and the link. Its Menu (the
   system's tile menu): Record minutes, Add task, Attendees, Full screen. Redrawn every 30 seconds; the count follows new
   sign-ins at once. */
import { pad, tz_parts, page_tz, fmt_time } from '../lib/index.js';
import { db, route, rerender, after_render, TIMERS } from '../store/index.js';
import { ic } from '../icons/index.js';
import { badge, empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { agenda_now } from './agenda_now.js';
import { count_to, left, tick } from './countdown.js';
import { att_count, att_url, BASE } from './attend_side.jsx';
import { att_phase } from './att_window.js';
import { Qr } from './qr.jsx';
import { tile_menu } from '../admin/tile_menu.jsx';
