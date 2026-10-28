/* modules/roles.jsx: VIEWS.roles: the roles list (people per role) and the chosen role: invite link, delete, the page it
   lands on after sign-in (only pages it can open, so that select follows the matrix) and the access matrix per module.
   The chosen role's card is keyed by its id, and the landing select by the role's access + landing page, so each redraws. */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth, roles, MODS, land_opts, land_value, invite_link } from '../auth/index.js';
import { ic, i3 } from '../icons/index.js';
