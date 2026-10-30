/* events/event_invites.jsx: an event's Invitations card. Add email addresses (type or paste them, or upload a spreadsheet
   or text file: every address in it is found); they wait as chips until Send invites, which also takes what is still
   typed. The people invited are listed with the day they were invited, and can be removed. A cancelled or past event keeps
   its list but takes no new invites. INVITE_ACT: the card's buttons (merged into EV_ACT). */
import { qs, cap, fmt_stamp } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { help_tip } from '../ui/index.js';
