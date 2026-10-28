/* store/app_state.js: the one place that redraws the app.
   Views read data (db, ui, route) while they render. After changing anything, call rerender() (same page)
   or render() (a new page: dialogs close, the page scrolls to the top). Both redraw synchronously, so code
   right after them can already query the new DOM, exactly like the reference's innerHTML rendering. */
import { flushSync } from 'react-dom';
import { db } from './db.js';
import { ymd } from '../lib/index.js';

/* UI state that is not data: open tabs, table pages, sorting, column searches, sidebar, calendar view… */
