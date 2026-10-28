/* ui/badges.jsx: 7. SHARED UI PIECES (cells, badges, forms, dialogs, toasts, charts).
   Status tones and the small pieces tables and cards are built from: badge, tag, initials, avatar, person. */
import { me } from '../auth/index.js';

export const TONE = { Active: 'ok', Present: 'ok', Approved: 'ok', Paid: 'ok', Returned: 'ok', Done: 'ok', Open: 'ok', Exited: 'ok', Found: 'ok', Donated: 'info', Graduated: 'info',
  'On leave': 'warn', Late: 'warn', Pending: 'warn', Partial: 'warn', Medium: 'warn', Damaged: 'warn', Suspended: 'warn',
  Planned: 'info', 'In progress': 'info', Rented: 'info', Low: 'info', Excused: 'info', Parked: 'info',
  Inactive: 'bad', Absent: 'bad', Rejected: 'bad', Overdue: 'bad', Unpaid: 'bad', High: 'bad', Lost: 'bad', Closed: 'muted', 'To do': 'muted' };
/* the tone classes written out in full so Tailwind's scanner keeps them (the reference built bg-${tone}/15 text-${tone}) */
const TONE_CLASS = { ok: 'bg-ok/15 text-ok', warn: 'bg-warn/15 text-warn', info: 'bg-info/15 text-info', bad: 'bg-bad/15 text-bad', muted: 'bg-muted/15 text-muted' };
