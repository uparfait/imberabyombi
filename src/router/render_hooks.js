/* router/render_hooks.js: the work around each draw of #app. before_page() runs before every draw (closes
   the picker and tooltips, forgets the charts, closes dialogs on a new page); run_after_render() runs once the page is on screen
   (scroll, page animation, queued AFTER work, enhancers, the message for the next page, the help icon's introduction, a
   flashed row, a pending form). */
import { qs, qsa } from '../lib/index.js';
import { ui, render_flags, AFTER } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { show_next } from '../feedback/index.js';
import { pick, tip, help_intro } from '../overlays/index.js';
import { CHARTS, viz_tip } from '../charts/index.js';
import { open_form } from '../table/index.js';
import { clear_nav_busy } from '../behaviors/index.js';
import { enhance } from './enhance.js';

let skipped = false;     /* this draw kept the previous page (an admin redirect): nothing to do after it */
let side_top = 0;        /* the admin sidebar keeps its scroll position across navigation */
let main_enter = false;  /* the current page's <main> came with the page-enter animation */
export const skip_after_render = () => { skipped = true; };

export function before_page(keep) {
  CHARTS.clear(); pick.close(); tip.hide(); viz_tip.hide(); clear_nav_busy();
