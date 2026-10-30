/* behaviors/scrolling.js: smooth wheel hand-over from inner scroll areas to the page (glide, chain_wheel), the header line and
   docked menu row (header_line), what scrolling and resizing close or move, and the debounced resize work (RZ). */
import { qs, qsa } from '../lib/index.js';
import { ui } from '../store/index.js';
import { pick, tip } from '../overlays/index.js';
import { viz_tip, redraw_charts } from '../charts/index.js';
import { place_tile } from '../actions/index.js';

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
