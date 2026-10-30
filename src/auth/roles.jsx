/* auth/roles.jsx: roles and their permissions (the built-in ROLES0, the saved list), the landing page per role and the
   "Lands on" choices. perm_map('a:2,b:1') → { a: 2, b: 1 }. */
import { db } from '../store/index.js';
import { MODS } from './mods.js';
