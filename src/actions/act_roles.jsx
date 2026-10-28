/* actions/act_roles.jsx: data-act handlers of Roles & access: select a role, create one (name, description, landing
   module), delete one that no staff member uses. */
import { qs } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { MODS, roles, perm_map } from '../auth/index.js';
import { notify, show_msg } from '../feedback/index.js';
