/* modules/people_views.jsx: the people modules: Staff (role-based access, copy a personal access link per row), Employees
   (by department), Attendance (live clock, check in / out, today's numbers) and Students (registration, bulletins, payments). */
import { VIEWS } from './views.js';
import { db, ui, after_render, TIMERS } from '../store/index.js';
import { auth, me, access_link } from '../auth/index.js';
import { ymd, fmt_d, money, qs, fmt_stamp } from '../lib/index.js';
import { ic, i3 } from '../icons/index.js';
import { badge, tabs, stat_row } from '../ui/index.js';
import { DEPTS } from '../schemas/index.js';
import { crud } from '../table/index.js';
