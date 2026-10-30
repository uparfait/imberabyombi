/* events/attendees_view.jsx: who attended an event or activity, in an overlay (the #viewer dialog) over the page that asks
   (its page, Open This Event): no page of its own. The usual table, so it searches, sorts, pages and exports (CSV, JSON,
   Excel; no filters); a row shows the person and their signature. Only what people submit: no Add, Edit or Delete. It
   follows new ones at once (the storage listener in attend_page.jsx). ATTENDEES_ACT.ev_att_list (data-c, data-id) opens it. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { ic } from '../icons/index.js';
import { show_in_dialog } from '../overlays/index.js';
import { crud } from '../table/index.js';
