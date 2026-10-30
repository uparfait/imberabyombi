/* events/event_page.jsx: one event on its own page (/admin/events/<id>, from a row of the Events table, a card or the
   calendar): its title and where it stands (ev_state), its details as cards by section, each edited on its own, and on
   the right its status with the actions that fit it now (postpone, cancel, back on schedule, mark as completed, stop
   repeating, duplicate, delete). Reading only (no managing rights): no Edit buttons and no actions. */
import { db, route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge, empty, help_tip } from '../ui/index.js';
