/* ui/badges.jsx: 7. SHARED UI PIECES (cells, badges, forms, dialogs, toasts, charts).
   Status tones and the small pieces tables and cards are built from: badge, tag, initials, avatar, person. */
import { me } from '../auth/index.js';

export const TONE = { Active: 'ok', Present: 'ok', Approved: 'ok', Paid: 'ok', Returned: 'ok', Done: 'ok', Open: 'ok', Exited: 'ok', Found: 'ok', Donated: 'info', Graduated: 'info',
  'On leave': 'warn', Late: 'warn', Pending: 'warn', Partial: 'warn', Medium: 'warn', Damaged: 'warn', Suspended: 'warn',
