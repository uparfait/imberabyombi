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
  return <div className="ev_inv_box">
    <p className="ev_inv_bar">People invited<span className="chip bg-surface-2 text-muted">{inv.length}</span></p>
    <div className="ev_inv_scroll"><table className="ev_inv_table"><thead><tr><th scope="col">Email address</th><th scope="col" className="ev_inv_day">Invited on</th>
      {open ? <th scope="col" className="ev_inv_acts"><span className="sr-only">Actions</span></th> : null}</tr></thead>
      <tbody>{inv.map(i => <tr key={i.e}>
        <td><span className="block truncate">{i.e}</span><span className="ev_inv_sub">{day(i.at)}</span></td><td className="ev_inv_day">{day(i.at)}</td>
        {open ? <td className="ev_inv_acts"><button type="button" className="icon_btn ev_inv_x h-8 w-8" data-act="ev_uninvite" data-id={e.id} data-e={i.e}
}
