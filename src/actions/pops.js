/* actions/pops.js: the small menus (.pop): close them all (animated), open or close one, and place a "Your modules" menu.
   They open and close by their hidden attribute only (no redraw); the button that opens one gets aria-expanded, so screen
   readers know and its arrow can turn (e.g. Notes on a signer). */
import { qsa } from '../lib/index.js';
import { reduced } from '../feedback/index.js';

export function close_pops() { qsa('.pop:not([hidden])').forEach(p => { if (p._out) return; if (reduced()) { p.hidden = true; return; }
  const a = p._out = p.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(.6rem) scale(.98)' }], { duration: 160, easing: 'cubic-bezier(.22,.8,.22,1)' });
  a.onfinish = () => { if (p._out === a) { p.hidden = true; p._out = null; } }; }); }
export function toggle_pop(id) { const p = document.getElementById(id); if (!p) return; const open = !p.hidden && !p._out; close_pops(); if (!open) { p._out?.cancel(); p._out = null; p.hidden = false; if (p.matches('.tile_pop, .pop_fixed')) place_tile(p); } }
/* "Your modules" style menus and fixed menus (the account menu): right under their button (8px gap), kept 8px inside
   the screen, as tall as the room below allows (a tile menu at most 480px; the tiles scroll inside) */
export function place_tile(p) {
  const b = document.querySelector(`[data-pop="${p.id}"]`); if (!b || p.hidden) return;
  /* inside a zoomed page (O-Doc Sign scaled to fit) the menu is placed in that page's own pixels: screen pixels ÷ zoom */
  const z = p.currentCSSZoom || 1, r = b.getBoundingClientRect(), top = r.bottom / z + 8, w = innerWidth / z, h = innerHeight / z;
  p.style.top = top + 'px'; p.style.left = Math.max(8, Math.min(r.left / z, w - p.offsetWidth - 8)) + 'px'; p.style.maxHeight = Math.max(160, Math.min(p.classList.contains('tile_pop') ? 480 : h, h - top - 12)) + 'px';
}
