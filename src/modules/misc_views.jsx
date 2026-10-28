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
VIEWS.nav = () => <div id="nav_demo">{nav_drops(true)}</div>;

export const forbidden = () => <div className="card">{empty('You do not have access to this area', 'Ask a Super Admin to give your role view access to this module.',
  <a href="#/admin" className="btn btn_primary btn_sm">Go to your start page</a>)}</div>;

export const not_found = admin => admin ? <div className="card">{empty('Page not found', 'Check the address or pick a module from the menu.')}</div>
  : <>{page_hero('Not found', 'Page not found', 'Check the address, or go back to the home page.', 'compass')}
    <div className="wrap pb-20 text-center"><a href="#/" className="btn btn_primary">Go to home page</a></div></>;
