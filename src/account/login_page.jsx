/* account/login_page.jsx: #/login: pick a role (or arrive with an invitation, ?role=), name, email and any password.
   FORMS.login (actions) signs in; ?name= and ?email= fill the fields, and the last role used is preselected. */
import { ic } from '../icons/index.js';
import { roles } from '../auth/index.js';
import { db } from '../store/index.js';
import { auth_shell, auth_links } from './auth_shell.jsx';

/* the invitation note, or the role picker */
const role_part = (inv, rs, sel) => inv ? <>
