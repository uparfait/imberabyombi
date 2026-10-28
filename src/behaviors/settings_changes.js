/* behaviors/settings_changes.js: the change listener's settings branches: the text-selection switch (right-click menu),
   a role's landing page, a role's access level per module, and importing a backup file. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { request, toast, show_msg } from '../feedback/index.js';
import { MODS, roles, role_opens } from '../auth/index.js';
import { apply_tokens } from '../actions/index.js';

export function allow_select_change(t) {
  db.set('allowSelect', t.checked); document.documentElement.classList.toggle('allow_select', t.checked);
  t.closest('[role=menuitemcheckbox]')?.setAttribute('aria-checked', t.checked);
}

export function role_land_change(t) {
  const rs = roles(), r = rs.find(x => x.id === t.dataset.roleLand);
  if (r) request(() => { r.land = t.value; db.set('roles', rs);
    toast(`People with this role now land on ${MODS.find(m => m.k === t.value)?.l || t.value}.`, 'ok', 'Landing page updated'); });
}

/* The reference refilled the role's landing <select> by hand and redrew only for the signed-in user's own role; here the redraw
   always runs and does both (the roles view keys that select by the role's landing page and access, so it follows the data). */
export function perm_change(t) {
  const rs = roles(), r = rs.find(x => x.id === t.dataset.role);
  if (r && r.perms !== '*') request(() => { const was = r.land; r.perms = { ...r.perms, [t.dataset.perm]: +t.value };
    if (!role_opens(r).some(m => m.k === r.land)) r.land = role_opens(r)[0]?.k || '';   /* its landing page was taken away: the first page it can still open */
    db.set('roles', rs);
    const name = k => MODS.find(m => m.k === k)?.l || k, moved = was && was !== r.land;
