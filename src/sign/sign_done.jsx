/* sign/sign_done.jsx: "Signing complete" (/admin/sign/done/<id>), shown right after you sign: the document, when you
   signed, its status now, and the way back (the document, or your To sign list). */
import { i3 } from '../icons/index.js';
import { to } from '../router/index.js';
import { my_rec, when } from './sign_store.js';
import { status_chip } from './sign_list.jsx';
