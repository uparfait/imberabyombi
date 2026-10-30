/* events/invite_table.jsx: the people invited to an event, as a table: email address, the day they were invited and,
   while the event takes invites, Edit and Remove. Edit turns the address into a field in its row (Enter or the tick saves,
   Esc or the cross cancels); a new address gets the invitation, dated today. Remove asks first; its button takes the
   warning colour on hover. On a phone the day shows under the address. INVITE_TABLE_ACT: its buttons. */
import { qs, fmt_stamp } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
