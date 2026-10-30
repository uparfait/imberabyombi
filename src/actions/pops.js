/* actions/pops.js: the small menus (.pop): close them all (animated), open or close one, and place a "Your modules" menu.
   They open and close by their hidden attribute only (no redraw). */
import { qsa } from '../lib/index.js';
import { reduced } from '../feedback/index.js';

export function close_pops() { qsa('.pop:not([hidden])').forEach(p => { if (p._out) return; if (reduced()) { p.hidden = true; return; }
  const a = p._out = p.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(.6rem) scale(.98)' }], { duration: 160, easing: 'cubic-bezier(.22,.8,.22,1)' });
