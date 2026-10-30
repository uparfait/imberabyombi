/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams; new ones default to the calendar's day;
   their date and times on one line in the form: row 'when') and events (venue, capacity and registrations; the registered
   cell shows a fill bar). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { ui } from '../store/index.js';
import { bar_cell } from '../ui/index.js';
import { show_err } from '../feedback/index.js';
import { field_spec, option_list, STATUS } from './fields.js';

export const activities_schema = {
  l: 'activity', n: 16, cols: ['title', 'date', 'start', 'end', 'category'],
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('date', 'Date', 'date', 0, 1, { def: () => ui.cal_date, row: 'when' }),
    field_spec('start', 'Starts', 'time', 0, 1, { def: () => '09:00', row: 'when' }), field_spec('end', 'Ends', 'time', 0, 1, { def: () => '10:00', row: 'when' }),
    field_spec('category', 'Category', 'select', option_list('Class|Meeting|Sport|Exam|Other')), field_spec('note', 'Note', 'textarea')
  ],
  /* it ends after it starts */
  before: (d, row, f) => {
    if (d.start && d.end && d.end <= d.start) { show_err(f.elements.end, 'End after it starts.'); f.elements.end.focus(); return false; }
    return d;
  },
  g: () => {
    const h = lorem.int(7, 16);
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-6, 14))), start: `${pad(h)}:00`, end: `${pad(h + lorem.int(1, 2))}:${lorem.pick(['00', '30'])}`,
      category: lorem.pick(['Class', 'Meeting', 'Sport', 'Exam']), note: lorem.s()
    };
  }
};

export const events_schema = {
  l: 'event', n: 6, cols: ['title', 'date', 'start', 'venue', 'registered', 'status'],
  sec: { Event: 'title,about,status', 'When & where': 'date,start,venue', Seats: 'capacity,registered' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('date', 'Date', 'date', 0, 1), field_spec('start', 'Starts', 'time', 0, 0, { def: () => '10:00' }),
    field_spec('venue', 'Venue'), field_spec('capacity', 'Capacity', 'number', 0, 1, { min: 1, def: () => 100 }),
    field_spec('registered', 'Registered', 'number', 0, 0, { min: 0, def: () => 0 }), field_spec('status', 'Status', 'select', STATUS.ev, 1, { def: () => 'Planned' }),
    field_spec('about', 'Description', 'textarea')
  ],
  r: { registered: (v, row) => bar_cell(v, row.capacity) },
  g: () => {
    const c = lorem.int(4, 20) * 10;
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-10, 30))), start: `${pad(lorem.int(9, 16))}:00`, venue: lorem.t(2), capacity: c,
      registered: lorem.int(0, c), status: lorem.pick(STATUS.ev), about: lorem.s()
    };
  }
};
