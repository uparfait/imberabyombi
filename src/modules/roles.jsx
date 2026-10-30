/* modules/roles.jsx: VIEWS.roles: the roles list (people per role) and the chosen role: invite link, delete, the page it
   lands on after sign-in (only pages it can open, so that select follows the matrix) and the access matrix per module.
   The chosen role's card is keyed by its id, and the landing select by the role's access + landing page, so each redraws. */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth, roles, MODS, land_opts, land_value, invite_link } from '../auth/index.js';
import { ic, i3 } from '../icons/index.js';
import { empty } from '../ui/index.js';

const LV = ['No access', 'View', 'Manage'];

/* the access matrix: a radio per module and level (0 none · 1 view · 2 manage) */
const matrix = (sel, edit) => <div className="overflow-x-auto"><table><thead><tr><th scope="col">Module</th>
  {LV.map(x => <th key={x} scope="col" className="text-center">{x}</th>)}</tr></thead>
  <tbody>{MODS.map(m => <tr key={m.k}><th scope="row" className="bg-transparent text-sm font-medium text-fg"><span className="flex items-center gap-3">
    {ic(m.i, 'h-4 w-4 text-muted')}{m.l}</span></th>
    {[0, 1, 2].map(v => <td key={v} className="text-center">
      <input type="radio" name={`p_${m.k}`} value={v} data-perm={m.k} data-role={sel.id} aria-label={`${m.l}: ${LV[v]}`}
      defaultChecked={(sel.perms[m.k] || 0) === v} disabled={!edit} /></td>)}</tr>)}</tbody></table></div>;

VIEWS.roles = () => {
  const rs = roles(), sel = rs.find(r => r.id === ui.role) || rs[0], can = auth.can('roles', 2), st = db.list('staff'), cnt = id => st.filter(s => s.role === id).length;
  const full = sel.perms === '*', edit = can && !full, land = land_value(sel);
  return <div className="room"><div className="room_side grid gap-6">
    <section className="card p-3"><header className="flex items-center justify-between p-2"><h2 className="text-lg">Roles</h2>
      {can ? <button className="btn btn_primary btn_sm" data-act="role_new">{ic('plus', 'h-4 w-4')}New role</button> : null}</header>
      <ul className="grid gap-1">{rs.map(r => <li key={r.id}>
        <button className={`side_link w-full ${r.id === sel.id ? 'active' : ''}`} data-act="role_sel" data-id={r.id}>{ic(r.perms === '*' ? 'shield' : 'key')}
        <span className="flex-1 truncate text-left">{r.name}</span><span className="chip bg-surface-2 text-muted" data-tip="People with this role">{cnt(r.id)}
          </span></button></li>)}</ul></section>
    <section key={sel.id} className="card overflow-hidden"><header className="flex flex-wrap items-start gap-4 border-b border-line p-5">
      {i3(full ? 'shield' : 'key', 'h-12 w-12', full ? 'violet' : 'amber')}
      <div className="min-w-[10rem] flex-1"><h2 className="text-xl">{sel.name}</h2><p className="text-sm text-muted">{sel.d || 'Custom role.'}</p></div>
      <div className="flex flex-wrap gap-2"><button className="btn btn_outline btn_sm" data-act="copy" data-text={invite_link(sel.id)}>
        {ic('link', 'h-4 w-4')}Copy invite link</button>
        {can && !sel.locked ? <button className="btn btn_danger btn_sm" data-act="role_del" data-id={sel.id}>
          {ic('trash', 'h-4 w-4')}Delete role</button> : null}</div></header>
      <div id="matrix_msg" className="px-5 pt-4 empty:hidden"></div>
      <div className="border-b border-line px-5 py-4"><div className="field max-w-xs"><label htmlFor="role_land">Lands on after sign-in</label>
        <select key={`${land}|${JSON.stringify(sel.perms)}`} id="role_land" data-role-land={sel.id} disabled={!can} defaultValue={land}>{land_opts(sel)}
          </select></div></div>
      {full ? empty('Full access', 'Super Admin can view and manage every module, including roles. This role cannot be changed.') : matrix(sel, edit)}
    </section></div></div>;
};
