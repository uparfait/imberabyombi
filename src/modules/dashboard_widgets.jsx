/* modules/dashboard_widgets.jsx: the dashboard cards a role may see, in this order: attendance this week
   (chart), my tasks, coming up (calendar), low stock, parking. */
import { db, after_render } from '../store/index.js';
import { auth } from '../auth/index.js';
import { add_d, ymd, parse_d, qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { i3 } from '../icons/index.js';
import { badge, stock_cell } from '../ui/index.js';
import { draw_chart } from '../charts/index.js';
import { cal_items } from '../admin/index.js';
import { due_tag } from './task_dates.jsx';
