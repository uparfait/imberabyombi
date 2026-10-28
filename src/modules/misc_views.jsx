/* modules/misc_views.jsx: modules built elsewhere (email designs, charts & KPIs, nested navigation) and the two
   fallbacks: no access to a module, and page not found (admin or public). */
import { VIEWS } from './views.js';
import { emails_view } from '../emails/index.js';
import { viz } from '../charts/index.js';
import { nav_drops } from '../admin/index.js';
import { empty } from '../ui/index.js';
