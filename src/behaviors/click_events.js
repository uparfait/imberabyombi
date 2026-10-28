/* behaviors/click_events.js: 13. EVENT DELEGATION, the click listener. One listener serves the whole app: it closes menus,
   opens the shared picker, animates <details>, scrolls to page sections and runs ACT[data-act] (through request() for REQ). */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { route } from '../store/index.js';
import { request, staff_page } from '../feedback/index.js';
