/* store/app_state.js: the one place that redraws the app.
   Views read data (db, ui, route) while they render. After changing anything, call rerender() (same page)
   or render() (a new page: dialogs close, the page scrolls to the top). Both redraw synchronously, so code
   right after them can already query the new DOM, exactly like the reference's innerHTML rendering. */
import { flushSync } from 'react-dom';
import { db } from './db.js';
import { ymd } from '../lib/index.js';

/* UI state that is not data: open tabs, table pages, sorting, column searches, sidebar, calendar view… */
export const ui = {
  q: {}, page: {}, sort: {}, tab: {}, closed: db.get('sideClosed', {}), cal_date: ymd(), cal_view: 'week', mini: null, role: null,
  side: false, side_min: db.get('sideMin', false), panel: null, slide: null, nav: [], viz_range: 30, tview: {}, table_full: null
};
export const cur = {};              /* per collection: the filter the current page applies (crud) */
export const loaded = new Set();    /* collections fetched during this page visit (the first view shows the loading spinner) */

/* the parsed hash route: { path, q } plus what the admin page adds (mod, title) */
export const route = { path: '/', q: {} };
export function set_route(next) { for (const k of Object.keys(route)) delete route[k]; Object.assign(route, next); }

/* what the next render is: keep = same page (rerender), anim = keep the page-enter animation, nav_fetched = data already waited for */
export const render_flags = { keep: false, anim: false, nav_fetched: false };
export const AFTER = [];      /* run once after the next render (charts drawing, focus…); views push into it while rendering */
export const TIMERS = [];     /* intervals that belong to the current page; cleared before every render */
const BEFORE = [];            /* cleanups every module registers once (close the picker, hide tooltips…) */
export const before_render = fn => BEFORE.push(fn);
