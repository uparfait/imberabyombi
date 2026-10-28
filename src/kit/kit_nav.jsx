/* kit/kit_nav.jsx: the "Nested navigation" specimen: the three-level system menus (nav_drops from admin), drawn in
   #nav_demo; the nav_open action changes ui.nav and redraws it. */
import { nav_drops } from '../admin/index.js';

export const kit_nav = () => (
  <>
    <p className="max-w-prose text-sm text-muted">Three levels in all: this system, System 2 (4 pages and System 3) and System 3 (its own pages).
      Every system has a home page with tiles; each open system gets a menu like Your modules (3D tiles).</p>
    <div id="nav_demo" className="mt-5">{nav_drops()}</div>
  </>
);
