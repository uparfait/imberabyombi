/* behaviors/scrolling.js: smooth wheel hand-over from inner scroll areas to the page (glide, chain_wheel), the header line and
   docked menu row (header_line), what scrolling and resizing close or move, and the debounced resize work (RZ). */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { pick, tip } from '../overlays/index.js';
import { viz_tip, redraw_charts } from '../charts/index.js';
import { close_pops, place_tile } from '../actions/index.js';

/* Smooth scrolling: the page always uses the browser's own (threaded, smooth) scrolling. Only the scroll areas inside
   the page that have content around them ([data-chain]: sidebar, side panel, calendar hours) listen to the wheel, and
   only to hand it over: once such an area is at its end, the page keeps going with an eased glide (no jumps, never stuck).
   Menus and dialogs contain their own scroll (overscroll-behavior), and the page is frozen behind open overlays. */
export const glide = { y: 0, last: 0, raf: 0,
  by(d) { const max = document.documentElement.scrollHeight - innerHeight;
    if (!this.raf) this.y = this.last = scrollY;
    this.y = Math.max(0, Math.min(max, this.y + d)); if (!this.raf) this.raf = requestAnimationFrame(this.step); },
  step() { const g = glide, dy = g.y - scrollY;
    /* stop when arrived, or when the user scrolled some other way meanwhile */
    if (Math.abs(dy) < 1 || Math.abs(scrollY - g.last) > 2) { g.raf = 0; return; }
    const before = scrollY; scrollTo({ top: before + (Math.abs(dy) * .2 < 1 ? Math.sign(dy) : dy * .2), behavior: 'instant' }); g.last = scrollY;
    g.raf = scrollY === before ? 0 : requestAnimationFrame(g.step); } };   /* could not move (page end): stop */
export function chain_wheel(e) {
  const el = e.currentTarget; if (e.ctrlKey || !e.deltaY || e.defaultPrevented) return;
  const end = e.deltaY > 0 ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1 : el.scrollTop <= 0;
  if (!end) return;
  e.preventDefault(); glide.by(e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1));
}
/* Headers show their bottom border only once the page is scrolled */
export const header_line = () => { qsa('#site_header, #app_header').forEach(h => h.classList.toggle('is_scrolled', scrollY > 8));
  const row = qs('.nav_row.is_pinned'), h = document.documentElement, docked = !!row && row.getBoundingClientRect().top <= 1;
  if (row) { const edge = Math.max(0, ...qsa('#app_header > :not(.link_group):not(.sr-only)').filter(e => e.offsetWidth).map(e => e.getBoundingClientRect().right));
    const left = row.parentElement.getBoundingClientRect().left, tools = qs('#app_header .link_group')?.getBoundingClientRect().left ?? innerWidth;
    h.style.setProperty('--dock_x', Math.max(0, Math.round(edge + 12 - left)) + 'px');
    h.style.setProperty('--dock_max', Math.max(120, Math.round(tools - 8 - left)) + 'px'); }   /* all the room up to the header tools */
  h.classList.toggle('nav_docked', docked); };   /* system pages: the menu row sits in the header, beside its left item */

/* the resize timer: the heavy work waits until resizing pauses */
