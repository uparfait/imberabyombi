/* router/render_hooks.js: the work around each draw of #app. before_page() runs before every draw (closes
   the picker and tooltips, forgets the charts, closes dialogs on a new page); run_after_render() runs once the page is on screen
   (scroll, page animation, queued AFTER work, enhancers, the message for the next page, the help icon's introduction, a
   flashed row, a pending form, fields alone on their row filling it). */
import { qs, qsa } from '../lib/index.js';
import { ui, render_flags, AFTER } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { show_next } from '../feedback/index.js';
import { pick, tip, help_intro } from '../overlays/index.js';
import { CHARTS, viz_tip } from '../charts/index.js';
import { open_form } from '../table/index.js';
import { fill_rows } from '../fields/index.js';
import { clear_nav_busy } from '../behaviors/index.js';
import { enhance } from './enhance.js';

let skipped = false;     /* this draw kept the previous page (an admin redirect): nothing to do after it */
let side_top = 0;        /* the admin sidebar keeps its scroll position across navigation */
let main_enter = false;  /* the current page's <main> came with the page-enter animation */
export const skip_after_render = () => { skipped = true; };

export function before_page(keep) {
  CHARTS.clear(); pick.close(); tip.hide(); viz_tip.hide(); clear_nav_busy();
  qsa('#sidebar a.side_link[aria-busy]').forEach(a => a.removeAttribute('aria-busy'));
  side_top = qs('#sidebar_scroll')?.scrollTop || 0;
  if (!keep) ['confirm', 'modal', 'viewer'].forEach(id => { const d = qs('#' + id); if (d?.open) d.close(); });
}

export function run_after_render({ keep, anim }) {
  if (skipped) { skipped = false; return; }
  if (side_top) { const sd = qs('#sidebar_scroll'); if (sd) sd.scrollTop = side_top; side_top = 0; }
  /* React keeps <main> across redraws of the same page, so the animation is removed (keep) or restarted (keep + anim) by hand */
  const m = qs('#main');
  if (!keep) main_enter = !!m?.classList.contains('page_enter');
  else if (m) { m.classList.remove('page_enter'); if (anim && main_enter) { void m.offsetWidth; m.classList.add('page_enter'); } }
  if (!keep) scrollTo({ top: 0, behavior: 'instant' });
  AFTER.splice(0).forEach(f => { try { f(); } catch (e) { console.error(e); } });
  ui.flash = null; render_flags.nav_fetched = false; enhance(); show_next(); qsa('#app [data-fill-rows]').forEach(fill_rows);
  if (!keep) help_intro();   /* a new page: its first help icon introduces itself (once per load) */
  if (ui.scroll_flash) { ui.scroll_flash = false; qs('#main .row_flash')?.scrollIntoView({ block: 'center' }); }   /* a task opened from the calendar */
  if (ui.pending_form && schemas[ui.pending_form]) { const c = ui.pending_form; ui.pending_form = null; open_form(c); }   /* "Add …" chosen on another page */
}
