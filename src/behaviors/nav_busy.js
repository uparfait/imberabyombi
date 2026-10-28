/* behaviors/nav_busy.js: the sidebar link just clicked shows the spinner in place of its icon while its page loads.
   The click listener calls set_nav_busy(href); a sidebar link reads use_nav_busy(href) (a hook: call it in a component);
   every redraw clears it (the reference's redraw brought the icon back). */
import { useSyncExternalStore } from 'react';

let busy_href = null;
const subs = new Set();
const subscribe = fn => { subs.add(fn); return () => subs.delete(fn); };

export const set_nav_busy = href => { busy_href = href; subs.forEach(fn => fn()); };
/* called before every render (no notify: the redraw that follows reads the cleared value) */
