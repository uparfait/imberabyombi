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
  if (v !== old) { db.upsert('events', { id, invites: e.invites.map(i => i.e === old ? { e: v, at: Date.now() } : i) }); notify(`The invitation was sent to ${v}.`, 'ok', 'Address changed'); }
  rerender();
}

export const INVITE_TABLE_ACT = {
  ev_inv_edit: t => { editing = `${t.dataset.id}|${t.dataset.e}`; rerender(); },
  ev_inv_save: t => save(t.dataset.id, t.dataset.e, qs('.ev_inv_input')),
  ev_inv_stop: stop,
  ev_uninvite: t => ask(`Remove ${t.dataset.e} from the invitations? They will not get any more emails about this event.`, () => {
    const e = db.find('events', t.dataset.id); db.upsert('events', { id: e.id, invites: (e.invites || []).filter(i => i.e !== t.dataset.e) }); rerender();
    notify('They are no longer on the list.', 'ok', 'Invitation removed'); }, 'Remove', true)
};

const btn = (act, icon, tip, cls, d) => <button type="button" className={`icon_btn h-8 w-8 ${cls}`} data-act={act} data-id={d.id} data-e={d.e} data-tip={tip} aria-label={tip}>{ic(icon, 'h-4 w-4')}</button>;
const edit_row = (id, i) => <tr key={i.e} className="ev_inv_editing"><td>
  <input className="ev_inv_input" type="email" defaultValue={i.e} aria-label={`New address for ${i.e}`} autoFocus
    onKeyDown={k => { if (k.key === 'Enter') { k.preventDefault(); save(id, i.e, k.currentTarget); } if (k.key === 'Escape') { k.stopPropagation(); stop(); } }} /></td>
  <td className="ev_inv_day">{day(i.at)}</td>
  <td className="ev_inv_acts">{btn('ev_inv_save', 'check', 'Save', '', { id, e: i.e })}{btn('ev_inv_stop', 'x', 'Cancel', '', { id, e: i.e })}</td></tr>;
