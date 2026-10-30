/* behaviors/click_events.js: the delegated click listener. One listener serves the whole app: it closes menus,
   opens the shared picker, animates <details>, scrolls to page sections and runs ACT[data-act] (through request() for REQ).
   Other internal links then move through go() (link_clicks.js). */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { route } from '../store/index.js';
import { request, staff_page } from '../feedback/index.js';
