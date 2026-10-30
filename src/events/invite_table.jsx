/* events/invite_table.jsx: the people invited to an event, as a table: email address, the day they were invited and,
   while the event takes invites, Edit and Remove. Edit turns the address into a field in its row (Enter or the tick saves,
   Esc or the cross cancels); a new address gets the invitation, dated today. Remove asks first; its button takes the
   warning colour on hover. On a phone the day shows under the address. INVITE_TABLE_ACT: its buttons. */
import { qs, fmt_stamp } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { ic } from '../icons/index.js';
import { notify, show_err } from '../feedback/index.js';
import { ask } from '../overlays/index.js';
import { find_emails } from './invite_emails.js';

let editing = '';   /* "<event id>|<address>" while an address is being changed */
const day = at => fmt_stamp(at, { dateStyle: 'medium' });
const stop = () => { editing = ''; rerender(); };
function save(id, old, input) {
  const e = db.find('events', id), v = (input?.value || '').trim().toLowerCase(); if (!e || !input) return stop();
  if (find_emails(v)[0] !== v) { show_err(input, 'Enter an email address, such as name@example.com.'); return input.focus(); }
  if (v !== old && e.invites.some(i => i.e === v)) { show_err(input, 'This address is already invited.'); return input.focus(); }
  editing = '';
