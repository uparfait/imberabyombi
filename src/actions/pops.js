/* actions/pops.js: the small menus (.pop): close them all (animated), open or close one, and place a "Your modules" menu.
   They open and close by their hidden attribute only (no redraw); the button that opens one gets aria-expanded, so screen
   readers know and its arrow can turn (e.g. Notes on a signer). */
import { qsa } from '../lib/index.js';
import { reduced } from '../feedback/index.js';

const expanded = (p, on) => qsa(`[data-pop="${p.id}"]`).forEach(b => b.setAttribute('aria-expanded', String(on)));
export function close_pops() { qsa('.pop:not([hidden])').forEach(p => { if (p._out) return; expanded(p, false); if (reduced()) { p.hidden = true; return; }
  const a = p._out = p.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(.6rem) scale(.98)' }], { duration: 160, easing: 'cubic-bezier(.22,.8,.22,1)' });
  a.onfinish = () => { if (p._out === a) { p.hidden = true; p._out = null; } }; }); }
export function toggle_pop(id) { const p = document.getElementById(id); if (!p) return; const open = !p.hidden && !p._out; close_pops(); if (!open) { p._out?.cancel(); p._out = null; p.hidden = false; expanded(p, true); if (p.matches('.tile_pop, .pop_fixed')) place_tile(p); } }
/* "Your modules" style menus and fixed menus (the account menu): right under their button (8px gap), or above it when
   there is more room there than below (a button low on the screen), kept 8px inside the screen, as tall as that room
   allows (a tile menu at most 480px; the tiles scroll inside) */
export function place_tile(p) {
  const b = document.querySelector(`[data-pop="${p.id}"]`); if (!b || p.hidden) return;
  /* inside a zoomed page (O-Doc Sign scaled to fit) the menu is placed in that page's own pixels: screen pixels ÷ zoom */
  const z = p.currentCSSZoom || 1, r = b.getBoundingClientRect(), w = innerWidth / z, h = innerHeight / z, below = h - r.bottom / z - 20, above = r.top / z - 20;
  const cap = p.classList.contains('tile_pop') ? 480 : h, up = p.offsetHeight > below && above > below, room = Math.max(160, Math.min(cap, up ? above : below));
  p.style.maxHeight = room + 'px'; p.style.top = (up ? r.top / z - 8 - Math.min(p.offsetHeight, room) : r.bottom / z + 8) + 'px';
  p.style.left = Math.max(8, Math.min(r.left / z, w - p.offsetWidth - 8)) + 'px';
}
