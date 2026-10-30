/* actions/pops.js: the small menus (.pop): close them all (animated), open or close one, and place a "Your modules" menu.
   They open and close by their hidden attribute only (no redraw). */
import { qsa } from '../lib/index.js';
import { reduced } from '../feedback/index.js';

export function close_pops() { qsa('.pop:not([hidden])').forEach(p => { if (p._out) return; if (reduced()) { p.hidden = true; return; }
