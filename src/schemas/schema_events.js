/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams; new ones default to the calendar's day)
   and events (venue, capacity and registrations; the registered cell shows a fill bar). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { ui } from '../store/index.js';
import { bar_cell } from '../ui/index.js';
import { field_spec, option_list, STATUS } from './fields.js';

export const activities_schema = {
  l: 'activity', n: 16, cols: ['title', 'date', 'start', 'end', 'category'],
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('date', 'Date', 'date', 0, 1, { def: () => ui.cal_date }),
    field_spec('start', 'Starts', 'time', 0, 1, { def: () => '09:00' }), field_spec('end', 'Ends', 'time', 0, 1, { def: () => '10:00' }),
    field_spec('category', 'Category', 'select', option_list('Class|Meeting|Sport|Exam|Other')), field_spec('note', 'Note', 'textarea')
