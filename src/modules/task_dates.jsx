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
  : <span className="text-muted">—</span>;
setInterval(() => qsa('[data-due]').forEach(e => { const r = { due: e.dataset.due, status: e.dataset.status, end: e.dataset.end };
  e.lastElementChild.textContent = due_text(r); e.classList.toggle('late', r.status !== 'Done' && countdown(r.due).late); }), 30000);

/* a task date in an editor: an older bare date gets a time (start 09:00, due and completed 17:00) */
export const dt_in = (s, k) => !s ? '' : /T\d/.test(s) ? String(s).slice(0, 16) : `${s}T${k === 'start' ? '09:00' : '17:00'}`;
/* when a comment was written: "just now", "5m ago", "3h ago", then the date */
export const ago = t => { const m = Math.round((Date.now() - t) / 6e4);
  return m < 1 ? 'just now' : m < 60 ? `${m}m ago` : m < 1440 ? `${Math.round(m / 60)}h ago` : fmt_d(ymd(new Date(t))); };
