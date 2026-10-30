/* auth/roles.jsx: roles and their permissions (the built-in ROLES0, the saved list), the landing page per role and the
   "Lands on" choices. perm_map('a:2,b:1') → { a: 2, b: 1 }. */
import { db } from '../store/index.js';
import { MODS } from './mods.js';

export const perm_map = s => Object.fromEntries(s.split(',').map(x => { const [k, v] = x.split(':'); return [k.trim(), +v]; }));
export const ROLES0 = [
  { id: 'super', name: 'Super Admin', perms: '*', locked: true, d: 'Sees and manages everything, including roles.' },
  { id: 'admin', name: 'Administrator', d: 'Runs daily operations across every module.',
