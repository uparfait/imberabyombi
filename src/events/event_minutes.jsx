/* events/event_minutes.jsx: an event's or activity's minutes and follow-ups, two cards on its page. Minutes: Record
   minutes opens the document editor on that day's own document ("Minutes · <title> · <date>"), started with who attended
   and the agenda; each day's minutes are listed by date with who wrote them, to open or share (a recurring one gathers
   one per day). Follow-ups: tasks made from it (the task form, linked by ref), with who does them and their status.
   MINUTES_ACT: their buttons. */
import { esc, fmt_d, fmt_time, pad, tz_parts, page_tz } from '../lib/index.js';
import { db } from '../store/index.js';
import { me } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge } from '../ui/index.js';
import { to, go } from '../router/index.js';
import { open_form } from '../table/index.js';

const doc_url = m => new URL(to('/admin/docs?doc=m_' + m.id), location.origin).href;
