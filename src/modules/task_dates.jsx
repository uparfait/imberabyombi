/* modules/task_dates.jsx: ── Tasks ── dates. Due: a countdown to the due date and time (largest units first, zero units left
   out: "3M 2h 12m left"), red once overdue ("1y 3M 2h 12m overdue"); it updates every 30 seconds. Dates follow the status:
   start + due while To do / In progress, start + completed on when Done, each a date and a time. */
import { parse_d, fmt_dt, fmt_d, ymd, qsa } from '../lib/index.js';
import { ic } from '../icons/index.js';
