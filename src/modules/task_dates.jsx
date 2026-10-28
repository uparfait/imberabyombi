/* modules/task_dates.jsx: ── Tasks ── dates. Due: a countdown to the due date and time (largest units first, zero units left
   out: "3M 2h 12m left"), red once overdue ("1y 3M 2h 12m overdue"); it updates every 30 seconds. Dates follow the status:
   start + due while To do / In progress, start + completed on when Done, each a date and a time. */
import { parse_d, fmt_dt, fmt_d, ymd, qsa } from '../lib/index.js';
import { ic } from '../icons/index.js';

/* a task date as a Date: "YYYY-MM-DDTHH:MM" (an older bare date counts as the end of that day) */
export const when_d = s => { if (/T\d/.test(s)) return new Date(s); const d = parse_d(s); d.setHours(23, 59, 59, 999); return d; };
export function countdown(due, now = Date.now()) {
  const end = when_d(due); let left = Math.floor(Math.abs(end - now) / 6e4); const out = [];
