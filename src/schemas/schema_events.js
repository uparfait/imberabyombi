/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams) and events (capacity and registrations;
   the registered cell shows a fill bar). Both have a type (Upcoming, Live now, Recurring) and their date, times and time
   zone on one line in the form (row 'when'), empty to start but for the zone, the device's; the calendar shows them in the
   page's zone. Their forms come in sections (form_sec): the same sections as their details. */
import { lorem, pad, ymd, add_d, page_tz, device_tz, zone_short } from '../lib/index.js';
import { bar_cell } from '../ui/index.js';
import { field_spec, option_list, STATUS } from './fields.js';
import { kind_spec, when_ok } from './event_fields.js';

/* a record's time zone in a table cell or its details: "GMT+2 · Kigali" on its date (none: set in the page's) */
const tz_cell = (v, row) => zone_short(v || page_tz(), row?.date);
/* the date row: date, start, end (required or not) and time zone */
const when_f = end_req => [field_spec('date', 'Date', 'date', 0, 1, { row: 'when' }), field_spec('start', 'Starts', 'time', 0, 1, { row: 'when' }),
  field_spec('end', 'Ends', 'time', 0, end_req, { row: 'when' }), field_spec('tz', 'Time zone', 'tz', 0, 1, { def: () => device_tz(), row: 'when' })];

export const activities_schema = {
  l: 'activity', n: 16, cols: ['title', 'kind', 'date', 'start', 'end', 'tz', 'category'], r: { tz: tz_cell },
  form_sec: true, sec: { Details: 'title,category,note', When: 'kind,date,start,end,tz' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('date', 'Date', 'date', 0, 1, { row: 'when' }),
    field_spec('start', 'Starts', 'time', 0, 1, { row: 'when' }), field_spec('end', 'Ends', 'time', 0, 1, { row: 'when' }),
    field_spec('tz', 'Time zone', 'tz', 0, 1, { def: () => device_tz(), row: 'when' }),
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
  l: 'event', n: 6, cols: ['title', 'date', 'start', 'tz', 'venue', 'registered', 'status'],
  sec: { Event: 'title,about,status', 'When & where': 'date,start,tz,venue', Seats: 'capacity,registered' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('date', 'Date', 'date', 0, 1, { row: 'when' }),
    field_spec('start', 'Starts', 'time', 0, 0, { row: 'when' }), field_spec('tz', 'Time zone', 'tz', 0, 1, { def: () => device_tz(), row: 'when' }),
    field_spec('venue', 'Venue'), field_spec('capacity', 'Capacity', 'number', 0, 1, { min: 1, def: () => 100 }),
    field_spec('registered', 'Registered', 'number', 0, 0, { min: 0, def: () => 0 }), field_spec('status', 'Status', 'select', STATUS.ev, 1, { def: () => 'Planned' }),
    field_spec('about', 'Description', 'textarea')
  ],
  r: { registered: (v, row) => bar_cell(v, row.capacity), tz: tz_cell },
  g: () => {
    const c = lorem.int(4, 20) * 10;
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-10, 30))), start: `${pad(lorem.int(9, 16))}:00`, venue: lorem.t(2), capacity: c,
      registered: lorem.int(0, c), status: lorem.pick(STATUS.ev), about: lorem.s()
    };
  }
};
