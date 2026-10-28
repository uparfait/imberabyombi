/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams; new ones default to the calendar's day)
   and events (venue, capacity and registrations; the registered cell shows a fill bar). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { ui } from '../store/index.js';
