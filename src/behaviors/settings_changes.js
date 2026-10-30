/* behaviors/settings_changes.js: the change listener's settings branches: the text-selection switch (account menu), the
   page's time zone (Settings),
   a role's landing page, a role's access level per module, and importing a backup file. */
import { qs, page_tz } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { request, toast, show_msg } from '../feedback/index.js';
import { MODS, roles, role_opens } from '../auth/index.js';
import { apply_tokens } from '../actions/index.js';

export function allow_select_change(t) {
  db.set('allowSelect', t.checked); document.documentElement.classList.toggle('allow_select', t.checked);
  t.closest('[role=menuitemcheckbox]')?.setAttribute('aria-checked', t.checked);
}

/* a new time zone is only a choice until Save: Save and Cancel wake up while it differs from the one in use */
export function page_tz_change(t) {
  const dirty = t.value !== page_tz(); t.closest('section')?.querySelectorAll('[data-act=tz_save], [data-act=tz_cancel]').forEach(b => b.disabled = !dirty);
}

export function role_land_change(t) {
  const rs = roles(), r = rs.find(x => x.id === t.dataset.roleLand);
  if (r) request(() => { r.land = t.value; db.set('roles', rs);
    toast(`People with this role now land on ${MODS.find(m => m.k === t.value)?.l || t.value}.`, 'ok', 'Landing page updated'); });
}

/* A permission change saves the role (moving its landing page if that page was taken away), then the whole page redraws: the menus
   and the role's landing <select> follow the data (the roles view keys that select by the role's landing page and access). */
export function perm_change(t) {
  const rs = roles(), r = rs.find(x => x.id === t.dataset.role);
  if (r && r.perms !== '*') request(() => { const was = r.land; r.perms = { ...r.perms, [t.dataset.perm]: +t.value };
    if (!role_opens(r).some(m => m.k === r.land)) r.land = role_opens(r)[0]?.k || '';   /* its landing page was taken away: the first page it can still open */
    db.set('roles', rs);
    const name = k => MODS.find(m => m.k === k)?.l || k, moved = was && was !== r.land;
    toast(moved ? `${name(was)} is no longer open to this role, so it now lands on ${r.land ? name(r.land) : 'no page yet'}.` : 'Access updated', 'ok',
      moved ? 'Landing page moved' : undefined);
    rerender(); });
}

export function import_change(t) {
  request(() => t.files[0].text().then(txt => {
    let o; try { o = JSON.parse(txt); if (!o || typeof o !== 'object' || Array.isArray(o)) throw 0; }
    catch { t.value = ''; return show_msg(qs('#backup_msg'), 'bad', 'That file is not a valid backup', 'Choose a .json file exported from this app.', false); }
    Object.entries(o).forEach(([k, v]) => db.set(k, v)); apply_tokens(); rerender();
    show_msg(qs('#backup_msg'), 'ok', 'Backup imported', `${Object.keys(o).length} saved items were restored.`); }));
}
