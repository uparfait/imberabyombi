/* actions/pops.js: the small menus (.pop): close them all (animated), open or close one, and place a "Your modules" menu.
   They open and close by their hidden attribute only (no redraw). */
import { qsa } from '../lib/index.js';
import { reduced } from '../feedback/index.js';

export function close_pops() { qsa('.pop:not([hidden])').forEach(p => { if (p._out) return; if (reduced()) { p.hidden = true; return; }
  const a = p._out = p.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(.6rem) scale(.98)' }], { duration: 160, easing: 'cubic-bezier(.22,.8,.22,1)' });
  a.onfinish = () => { if (p._out === a) { p.hidden = true; p._out = null; } }; }); }
export function toggle_pop(id) { const p = document.getElementById(id); if (!p) return; const open = !p.hidden && !p._out; close_pops(); if (!open) { p._out?.cancel(); p._out = null; p.hidden = false; if (p.classList.contains('tile_pop')) place_tile(p); } }
/* "Your modules" style menus open like the account menu: right under their button (8px gap), kept 8px inside the screen,
   as tall as the room below allows (the tiles scroll inside) */
export function place_tile(p) {
  const b = document.querySelector(`[data-pop="${p.id}"]`); if (!b || p.hidden) return;
