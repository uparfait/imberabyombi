/* behaviors/settings_changes.js: the change listener's settings branches: the text-selection switch (account menu),
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
