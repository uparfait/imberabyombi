/* router/pages.jsx: what each kind of route draws: the public website (and the design system), the staff (admin) pages behind
   sign-in and permissions, the account pages, and the page shown when a view fails. */
import { hash_str, lorem } from '../lib/index.js';
import { route } from '../store/index.js';
import { auth, MODS } from '../auth/index.js';
import { empty } from '../ui/index.js';
import { PAGES, home, detail, pub_header, footer } from '../site/index.js';
