/* auth/mods.js: RBAC modules = permission keys; levels 0 none · 1 view · 2 manage.
   Each record: k = key (route /admin/<k>), l = label, s = short label, i = icon, g = sidebar group, full = opens in the
   whole window without the admin sidebar and header (it brings its own Back button), d = what it is (the sidebar link's
   tooltip). */
export const MODS = [
  { k: 'dashboard', l: 'Dashboard', s: 'Home', i: 'chart', g: 'Overview' },
  { k: 'calendar', l: 'Calendar & activities', s: 'Calendar', i: 'calendar', g: 'Overview' },
  { k: 'tasks', l: 'Tasks', s: 'Tasks', i: 'tasks', g: 'Overview' },
  { k: 'docs', l: 'Document editor', s: 'Editor', i: 'description', g: 'Overview', full: true },   /* full: the whole window, no admin shell */
  { k: 'sign', l: 'O-Doc Sign', s: 'Sign', i: 'signature', g: 'Overview', full: true, d: 'Online document signing and stamping' },
  { k: 'staff', l: 'Staff', s: 'Staff', i: 'users', g: 'People' },
