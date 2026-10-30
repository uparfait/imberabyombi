/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams; new ones default to the calendar's day;
   their date and times on one line in the form: row 'when') and events (venue, capacity and registrations; the registered
   cell shows a fill bar). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { ui } from '../store/index.js';
import { bar_cell } from '../ui/index.js';
import { show_err } from '../feedback/index.js';
import { field_spec, option_list, STATUS } from './fields.js';
