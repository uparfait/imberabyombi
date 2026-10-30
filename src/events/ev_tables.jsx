/* events/ev_tables.jsx: two tables shared by an event's page and Open This Event. The agenda: presenter, item (its title
   and description) and time, the item running now marked (on the live screen, the ones before it faded). The organisers:
   the organiser, then the co-organisers (name with the role under it, email, phone); for those who manage it, Edit on
   each and Transfer on the organiser (org_act.jsx). In a narrow box the email and the time move under the name and the
   item, and the buttons show their icons only (ev_wide / ev_narrow). */
import { fmt_time } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { agenda_now } from './agenda_now.js';

const sub = v => v ? <span className="ev_sub">{v}</span> : null;

export function agenda_table(e, fade = false) {
  const ag = e.agenda || [], now = agenda_now(e);
