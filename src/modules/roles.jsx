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
