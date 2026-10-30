/* events/attend_page.jsx: the attendance page its QR code opens (/attend/<events|activities>/<id>): no header or sidebar,
   just the event or activity, when and where, and the form (attend_form.jsx). Closed once it is over or cancelled. A
   page that shows a count follows new sign-ins from other tabs at once (the storage listener below). */
import { fmt_d, fmt_time } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
