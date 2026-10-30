/* auth/roles.jsx: roles and their permissions (the built-in ROLES0, the saved list), the landing page per role and the
   "Lands on" choices. perm_map('a:2,b:1') → { a: 2, b: 1 }. */
import { db } from '../store/index.js';
import { MODS } from './mods.js';

export const perm_map = s => Object.fromEntries(s.split(',').map(x => { const [k, v] = x.split(':'); return [k.trim(), +v]; }));
export const ROLES0 = [
  { id: 'super', name: 'Super Admin', perms: '*', locked: true, d: 'Sees and manages everything, including roles.' },
  { id: 'admin', name: 'Administrator', d: 'Runs daily operations across every module.',
    perms: perm_map('dashboard:2,calendar:2,tasks:2,docs:2,sign:2,icons:2,tz:2,staff:2,employees:2,attendance:2,' +
      'students:2,library:2,events:2,inventory:2,parking:2,roles:1,emails:1,charts:1,nav:1,settings:1') },
  { id: 'hr', name: 'HR manager', d: 'Staff, employees and attendance.',
    perms: perm_map('dashboard:1,calendar:1,tasks:2,docs:2,sign:2,icons:2,tz:2,staff:2,employees:2,attendance:2,settings:1') },
  { id: 'teacher', name: 'Teacher', d: 'Students, bulletins and class activities.',
    perms: perm_map('dashboard:1,calendar:1,tasks:2,docs:2,sign:2,icons:2,tz:2,attendance:1,students:2,library:1,events:1,settings:1') },
  { id: 'accountant', name: 'Accountant', d: 'Payments and stock value.', perms: perm_map('dashboard:1,tasks:2,docs:2,sign:2,icons:2,tz:2,students:1,inventory:1,settings:1') },
  { id: 'librarian', name: 'Librarian', d: 'Books, rentals and declarations.', perms: perm_map('dashboard:1,tasks:2,docs:2,sign:2,icons:2,tz:2,attendance:1,library:2,settings:1') },
  { id: 'store', name: 'Store keeper', d: 'Reservations and inventory.', perms: perm_map('dashboard:1,tasks:2,docs:2,sign:2,icons:2,tz:2,inventory:2,settings:1') },
  { id: 'kitchen', name: 'Kitchen staff', d: 'Own tasks, attendance and kitchen stock.', perms: perm_map('calendar:1,tasks:2,docs:2,sign:2,icons:2,tz:2,attendance:1,inventory:1,settings:1') },
  { id: 'cleaner', name: 'Cleaner', d: 'Own tasks and attendance.', perms: perm_map('calendar:1,tasks:2,docs:2,sign:2,icons:2,tz:2,attendance:1,settings:1') },
  { id: 'security', name: 'Parking officer', d: 'Car check-in, check-out and monitoring.', perms: perm_map('dashboard:1,tasks:2,docs:2,sign:2,icons:2,tz:2,attendance:1,parking:2,settings:1') },
  { id: 'coordinator', name: 'Event coordinator', d: 'Events, calendar and reservations.',
    perms: perm_map('dashboard:1,calendar:2,tasks:2,docs:2,sign:2,icons:2,tz:2,events:2,inventory:2,settings:1') }
];
/* modules every role may use, and at what level (the document editor, O-Doc Sign, Iconisus, the time zone converter): roles
   saved before one existed get it */
const FOR_ALL = { docs: 2, sign: 2, icons: 2, tz: 2 };
export const roles = () => { let r = db.get('roles'); if (!Array.isArray(r) || !r.length) { r = ROLES0; db.set('roles', r); }
  else if (r.some(x => x.perms !== '*' && Object.keys(FOR_ALL).some(k => x.perms[k] == null))) {
    r = r.map(x => x.perms === '*' ? x : { ...x, perms: { ...FOR_ALL, ...x.perms } }); db.set('roles', r); }
  return r; };
/* Landing page: where people with a role arrive after signing in (set on Roles & access). It falls back to the
   first module the role can open when the chosen one is not set or no longer allowed. */
export const role_opens = r => MODS.filter(m => r && (r.perms === '*' || (r.perms[m.k] || 0) > 0));
export const landing = id => {
  const r = roles().find(x => x.id === id), ok = role_opens(r), k = ok.some(m => m.k === r?.land) ? r.land : ok[0]?.k;
  return k ? `/admin/${k}` : '/admin';
};
/* the "Lands on" choices: only the pages the role can open (they follow the access matrix as it changes).
   The chosen one is the select's value: <select defaultValue={land_value(r)} key={land_value(r)}>{land_opts(r)}</select> */
export const land_opts = r => {
  const ok = role_opens(r);
  return ok.length ? ok.map(m => <option key={m.k} value={m.k}>{m.l}</option>) : <option value="">No page yet</option>;
};
export const land_value = r => landing(r.id).replace(/^\/admin\/?/, '');
