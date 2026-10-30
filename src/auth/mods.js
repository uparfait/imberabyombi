/* auth/mods.js: RBAC modules = permission keys; levels 0 none · 1 view · 2 manage.
   Each record: k = key (route /admin/<k>), l = label, s = short label, i = icon, g = sidebar group, full = opens in the
   whole window without the admin sidebar and header (it brings its own Back button), d = what it is (the sidebar link's
   tooltip), app = an app of its own on this site that the link opens (a full page load, not a route of this one). */
export const MODS = [
  { k: 'dashboard', l: 'Dashboard', s: 'Home', i: 'chart', g: 'Overview' },
  { k: 'calendar', l: 'Calendar & activities', s: 'Calendar', i: 'calendar', g: 'Overview' },
  { k: 'tasks', l: 'Tasks', s: 'Tasks', i: 'tasks', g: 'Overview' },
  { k: 'docs', l: 'Document editor', s: 'Editor', i: 'description', g: 'Overview', full: true },   /* full: the whole window, no admin shell */
  { k: 'sign', l: 'O-Doc Sign', s: 'Sign', i: 'signature', g: 'Overview', full: true, d: 'Online document signing and stamping' },
  { k: 'qr', l: 'Qr-scan', s: 'Qr-scan', i: 'qr', g: 'Overview', app: '/qr-scan/', d: 'Scan a QR code: secure links open in a new tab. Installable on its own' },
  { k: 'staff', l: 'Staff', s: 'Staff', i: 'users', g: 'People' },
  { k: 'employees', l: 'Employees', s: 'Employees', i: 'briefcase', g: 'People' },
  { k: 'attendance', l: 'Attendance', s: 'Attendance', i: 'clock', g: 'People' },
  { k: 'students', l: 'Students', s: 'Students', i: 'cap', g: 'Academics' },
  { k: 'library', l: 'Library', s: 'Library', i: 'book', g: 'Academics' },
  { k: 'events', l: 'Events', s: 'Events', i: 'star', g: 'Operations' },
  { k: 'inventory', l: 'Reservations & inventory', s: 'Inventory', i: 'box', g: 'Operations' },
  { k: 'parking', l: 'Smart parking', s: 'Parking', i: 'car', g: 'Operations' },
  { k: 'roles', l: 'Roles & access', s: 'Roles', i: 'shield', g: 'System' },
  { k: 'emails', l: 'Email designs', s: 'Emails', i: 'mail', g: 'System' },
  { k: 'charts', l: 'Charts & KPIs', s: 'Charts', i: 'activity', g: 'System' },
  { k: 'icons', l: 'Iconisus', s: 'Iconisus', i: 'sparkle', g: 'System' },
  { k: 'tz', l: 'TZ PlayGround', s: 'TZ PlayGround', i: 'globe', g: 'System', d: 'Timezone PlayGround: a time in one time zone, as it reads in another' },   /* the 3D icon maker */
  { k: 'nav', l: 'System 2', s: 'System 2', i: 'layers', g: 'System' },   /* nested navigation: a system inside this one */
  { k: 'settings', l: 'Settings', s: 'Settings', i: 'sliders', g: 'System' }
];
