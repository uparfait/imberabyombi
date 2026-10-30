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
