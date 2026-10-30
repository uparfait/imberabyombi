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
  if (!ag.length) return <p className="text-sm text-muted">None yet</p>;
  return <div className="ev_inv_box ev_tbl"><table className="ev_inv_table ev_ag_table">
    <thead><tr><th scope="col">Presenter</th><th scope="col">Item</th><th scope="col" className="ev_ag_time ev_wide">Time</th></tr></thead>
    <tbody>{ag.map((a, i) => <tr key={i} className={i === now ? 'is_now' : fade && now > -1 && i < now ? 'is_done' : undefined}>
      <td>{a.p_name ? <><b className="block font-medium">{a.p_name}</b>{sub(a.p_title)}</> : '—'}</td>
      <td><b className="block font-medium">{a.title}{i === now ? <span className="chip ml-2 bg-ok/15 text-ok">Now</span> : null}</b>{sub(a.desc)}
        <span className="ev_sub ev_narrow">{fmt_time(a.from)} – {fmt_time(a.to)}</span></td>
      <td className="ev_ag_time ev_wide">{fmt_time(a.from)} – {fmt_time(a.to)}</td></tr>)}</tbody></table></div>;
}

const btn = (act, l, i, e, c, icon) => <button type="button" className="ev_edit" data-act={act} data-c={c} data-id={e.id} data-i={i} aria-label={l}>{ic(icon, 'h-3.5 w-3.5')}<span className="ev_btn_l">{l}</span></button>;

export function org_table(e, c, can) {
  const row = (p, role, i) => <tr key={role + i}><td><span className="block truncate">{p.name || '—'}</span>
    <span className="ev_sub ev_narrow truncate">{p.email}</span><span className="ev_sub">{role}</span></td>
    <td className="ev_wide"><span className="block truncate">{p.email || '—'}</span></td><td className="ev_wide ev_org_tel">{p.tel || '—'}</td>
    {can ? <td className="ev_org_acts">{btn('ev_org_edit', 'Edit', i, e, c, 'edit')}{i < 0 ? btn('ev_transfer', 'Transfer', i, e, c, 'key') : null}</td> : null}</tr>;
  return <div className="ev_inv_box ev_tbl"><table className="ev_inv_table ev_org_table">
    <thead><tr><th scope="col">Name</th><th scope="col" className="ev_wide">Email</th><th scope="col" className="ev_wide ev_org_tel">Phone</th>
      {can ? <th scope="col" className="ev_org_acts"><span className="sr-only">Actions</span></th> : null}</tr></thead>
    <tbody>{row({ name: e.org_name, email: e.org_email, tel: e.org_tel }, 'Organiser', -1)}{(e.co_orgs || []).map((o, i) => row(o, 'Co-organiser', i))}</tbody></table></div>;
