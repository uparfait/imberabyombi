/* behaviors/click_events.js: the delegated click listener. One listener serves the whole app: it closes menus,
   opens the shared picker, animates <details>, scrolls to page sections and runs ACT[data-act] (through request() for REQ).
   Other internal links then move through go() (link_clicks.js). */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { route } from '../store/index.js';
import { request, staff_page } from '../feedback/index.js';
import { pick, pick_at, tip, close_dialog } from '../overlays/index.js';
import { file_box } from '../files/index.js';
import { ACT, REQ, close_pops, toggle_details } from '../actions/index.js';
import { set_nav_busy } from './nav_busy.js';

function on_click(e) {
  tip.hide();
  const fin = e.target.closest?.('input[type=file]'); if (fin && fin.dataset.import == null) file_box(fin)?.classList.add('picking');
  if (!e.target.closest('.pop') && !e.target.closest('[data-pop]')) close_pops();
  else if (e.target.closest('#ctx a, #ctx button, .pop_fixed a, .pop_fixed button')) close_pops();   /* a choice in the right-click or account menu closes it */
  const pk = pick_at(e);
  if (pk) { if (pick.a !== pk) pick.open(pk); else if (pk.tagName === 'SELECT') pick.close(); return; }
