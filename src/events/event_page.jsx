/* events/event_page.jsx: one event on its own page (/admin/events/<id>, from a row of the Events table, a card or the
   calendar): its title and where it stands (ev_state), its details as cards by section, each edited on its own, and on
   the right its status with the actions that fit it now (postpone, cancel, back on schedule, mark as completed, stop
   repeating, duplicate, delete). Reading only (no managing rights): no Edit buttons and no actions. */
import { db, route } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge, empty, help_tip } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { event_cards } from './event_cards.jsx';

const HELP = 'Every detail of this event, by section. Edit a section on its own; postpone, cancel or restore the event on the right.';
/* the actions that fit each state: [handler, label, icon, the states it shows in] */
const ACTS = [
  ['ev_postpone', 'Postpone', 'clock', ['Upcoming', 'Recurring']], ['ev_postpone', 'Change the new date', 'calendar', ['Postponed']],
  ['ev_restore', 'Back on schedule', 'check', ['Postponed', 'Cancelled']], ['ev_done', 'Mark as completed', 'check', ['Live']],
