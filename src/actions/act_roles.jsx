/* actions/act_roles.jsx: data-act handlers of Roles & access: select a role, create one (name, description, landing
   module), delete one that no staff member uses. */
import { qs } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { MODS, roles, perm_map } from '../auth/index.js';
import { notify, show_msg } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';

const new_role_body = () => (
  <>
    <div className="field"><label htmlFor="new_role_name">Role name</label><input id="new_role_name" name="name" required placeholder=" " /></div>
    <div className="field"><label htmlFor="new_role_desc">Description</label><input id="new_role_desc" name="d" placeholder=" " /></div>
    <div className="field"><label htmlFor="new_role_land">Lands on after sign-in</label><select id="new_role_land" name="land" defaultValue="tasks">{MODS.map(m => <option value={m.k} key={m.k}>{m.l}</option>)}</select></div>
  </>
);

export const ROLE_ACT = {
  role_sel: t => { ui.role = t.dataset.id; rerender(); },
  role_new: () => modal({ title: 'New role', submit: 'Create role', body: new_role_body(),
    on_submit: d => { const rs = roles(), base = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'role'; let id = base, i = 2; while (rs.some(r => r.id === id)) id = base + '-' + i++;
      const perms = perm_map('tasks:2,settings:1'); if (d.land) perms[d.land] = Math.max(perms[d.land] || 0, 1);   /* landing there means it can at least view it */
