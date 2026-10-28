/* auth/mods.js: RBAC modules = permission keys; levels 0 none · 1 view · 2 manage.
   Each record: k = key (route #/admin/<k>), l = label, s = short label, i = icon, g = sidebar group. */
export const MODS = [
  { k: 'dashboard', l: 'Dashboard', s: 'Home', i: 'chart', g: 'Overview' },
  { k: 'calendar', l: 'Calendar & activities', s: 'Calendar', i: 'calendar', g: 'Overview' },
  { k: 'tasks', l: 'Tasks', s: 'Tasks', i: 'tasks', g: 'Overview' },
  { k: 'staff', l: 'Staff', s: 'Staff', i: 'users', g: 'People' },
  { k: 'employees', l: 'Employees', s: 'Employees', i: 'briefcase', g: 'People' },
