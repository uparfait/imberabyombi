/* events/invite_table.jsx: the people invited to an event, as a table with its count on top ("People invited 3"):
   email address, the day they were invited and, while the event takes invites, Remove (it asks first; its button takes
   the warning colour on hover). Addresses are changed before sending, on their chips (event_invites.jsx). On a phone the
   day shows under the address. INVITE_TABLE_ACT: its button. */
import { fmt_stamp } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { ic } from '../icons/index.js';
import { notify } from '../feedback/index.js';
import { ask } from '../overlays/index.js';

const day = at => fmt_stamp(at, { dateStyle: 'medium' });

export const INVITE_TABLE_ACT = {
  ev_uninvite: t => ask(`Remove ${t.dataset.e} from the invitations? They will not get any more emails about this event.`, () => {
    const e = db.find('events', t.dataset.id); db.upsert('events', { id: e.id, invites: (e.invites || []).filter(i => i.e !== t.dataset.e) }); rerender();
    notify('They are no longer on the list.', 'ok', 'Invitation removed'); }, 'Remove', true)
};

export function invite_table(e, open) {
  const inv = e.invites || [];
  if (!open || !inv.some(i => editing === `${e.id}|${i.e}`)) editing = '';
  return <><p className="ev_inv_count">{`${inv.length} invited`}</p>
    <div className="ev_inv_scroll"><table className="ev_inv_table"><thead><tr><th scope="col">Email address</th><th scope="col" className="ev_inv_day">Invited</th>
      {open ? <th scope="col" className="ev_inv_acts"><span className="sr-only">Actions</span></th> : null}</tr></thead>
      <tbody>{inv.map(i => editing === `${e.id}|${i.e}` ? edit_row(e.id, i) : <tr key={i.e}>
        <td><span className="block truncate">{i.e}</span><span className="ev_inv_sub">{day(i.at)}</span></td><td className="ev_inv_day">{day(i.at)}</td>
        {open ? <td className="ev_inv_acts">{btn('ev_inv_edit', 'edit', 'Change the address', '', { id: e.id, e: i.e })}
          {btn('ev_uninvite', 'x', 'Remove', 'ev_inv_x', { id: e.id, e: i.e })}</td> : null}</tr>)}</tbody></table></div></>;
}
