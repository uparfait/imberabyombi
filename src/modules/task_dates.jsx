/* modules/task_dates.jsx: ── Tasks ── dates. Due: a countdown to the due date and time (largest units first, zero units left
   out: "3M 2h 12m left"), red once overdue ("1y 3M 2h 12m overdue"); it updates every 30 seconds. Dates follow the status:
   start + due while To do / In progress, start + completed on when Done, each a date and a time. */
import { parse_d, fmt_dt, fmt_d, ymd, qsa } from '../lib/index.js';
import { ic } from '../icons/index.js';

/* a task date as a Date: "YYYY-MM-DDTHH:MM" (an older bare date counts as the end of that day) */
export const when_d = s => { if (/T\d/.test(s)) return new Date(s); const d = parse_d(s); d.setHours(23, 59, 59, 999); return d; };
export function countdown(due, now = Date.now()) {
  const end = when_d(due); let left = Math.floor(Math.abs(end - now) / 6e4); const out = [];
  for (const [u, n] of [['y', 525600], ['M', 43800], ['d', 1440], ['h', 60], ['m', 1]]) { const q = Math.floor(left / n); left -= q * n; if (q) out.push(q + u); }
  return { late: end < now, text: out.join(' ') || '0m' };
}
export const due_text = r => { if (r.status === 'Done') return r.end ? `Done ${fmt_dt(r.end)}` : fmt_dt(r.due);
  const c = countdown(r.due); return c.late ? `${c.text} overdue` : `${c.text} left`; };
const late = r => r.status !== 'Done' && r.due && countdown(r.due).late;
/* the countdown tag; its last <span> holds only text, so the 30-second tick below may replace that text */
export const due_tag = r => r.due || (r.status === 'Done' && r.end)
  ? <span className={`due_tag ${late(r) ? 'late' : ''}`} data-due={r.due || r.end} data-status={r.status || ''} data-end={r.end || ''} title={fmt_dt(r.due || r.end)}>
    {ic('clock', 'h-3.5 w-3.5 shrink-0')}<span>{due_text(r)}</span></span>
