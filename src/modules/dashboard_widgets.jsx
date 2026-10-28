/* modules/dashboard_widgets.jsx: the dashboard cards a role may see, in the reference's order: attendance this week
   (chart), my tasks, coming up (calendar), low stock, parking. */
import { db, after_render } from '../store/index.js';
import { auth } from '../auth/index.js';
import { add_d, ymd, parse_d, qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
