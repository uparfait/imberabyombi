/* modules/calendar.jsx: VIEWS.calendar (a week or month grid with a header to move around and add an activity, then the
   Activities table) and cal_go(), which moves the calendar to a date with a slide. */
import { VIEWS } from './views.js';
import { ui, rerender, after_render } from '../store/index.js';
import { auth } from '../auth/index.js';
import { parse_d, add_d, ymd, cap, qs, rem } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { crud } from '../table/index.js';
import { cal_items } from '../admin/index.js';
import { week_grid, month_grid } from './calendar_grids.jsx';
