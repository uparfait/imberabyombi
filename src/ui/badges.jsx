/* ui/badges.jsx: shared UI pieces (cells, badges, forms, dialogs, toasts, charts).
   Status tones and the small pieces tables and cards are built from: badge, tag, initials, avatar, person. */
import { me } from '../auth/index.js';

export const TONE = { Active: 'ok', Present: 'ok', Approved: 'ok', Paid: 'ok', Returned: 'ok', Done: 'ok', Open: 'ok', Exited: 'ok', Found: 'ok', Donated: 'info', Graduated: 'info',
  'On leave': 'warn', Late: 'warn', Pending: 'warn', Partial: 'warn', Medium: 'warn', Damaged: 'warn', Suspended: 'warn',
  Planned: 'info', 'In progress': 'info', Rented: 'info', Low: 'info', Excused: 'info', Parked: 'info',
  Inactive: 'bad', Absent: 'bad', Rejected: 'bad', Overdue: 'bad', Unpaid: 'bad', High: 'bad', Lost: 'bad', Closed: 'muted', 'To do': 'muted',
/* the tone classes written out in full so Tailwind's scanner keeps them (a class built as bg-${tone}/15 would not be generated) */
const TONE_CLASS = { ok: 'bg-ok/15 text-ok', warn: 'bg-warn/15 text-warn', info: 'bg-info/15 text-info', bad: 'bg-bad/15 text-bad', muted: 'bg-muted/15 text-muted' };
/* an empty value in a cell */
export const dash = () => <span className="text-muted">—</span>;

export const badge = v => v ? <span className={`chip ${TONE_CLASS[TONE[v] || 'muted']}`}>{v}</span> : dash();
export const tag = v => v ? <span className="chip bg-surface-2 text-fg/80">{v}</span> : dash();
export const initials = n => String(n || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
export const avatar = (n, c = 'h-8 w-8 text-xs') =>
  <span className={`grid ${c} shrink-0 place-items-center rounded-full bg-brand/15 font-semibold text-accent`} aria-hidden="true">{initials(n)}</span>;
/* "You" when it is the signed-in person (tasks: assigned to / by) */
export const person_you = n => n && n === me()
  ? <span className="flex min-w-0 items-center gap-2.5 whitespace-nowrap">{avatar(n)}<span className="font-medium">You</span></span>
  : person(n);
export const person = n => n
  ? <span className="flex min-w-0 items-center gap-2.5 whitespace-nowrap">{avatar(n)}<span className="min-w-0 truncate font-medium">{n}</span></span>
  : dash();
