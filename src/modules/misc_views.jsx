/* modules/misc_views.jsx: modules built elsewhere (email designs, charts & KPIs, nested navigation) and the two
   fallbacks: no access to a module, and page not found (admin or public). */
import { VIEWS } from './views.js';
import { emails_view } from '../emails/index.js';
import { viz } from '../charts/index.js';
import { nav_drops } from '../admin/index.js';
import { empty } from '../ui/index.js';
import { page_hero } from '../site/index.js';

VIEWS.emails = () => emails_view();   /* Email designs (built with the other page builders) */
VIEWS.charts = () => viz.view();      /* Charts & KPIs (section 11b) */
/* Nested navigation: a system of its own pages inside the dashboard (#/admin/nav/…), see nav_drops() */
