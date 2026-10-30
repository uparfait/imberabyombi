/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams) and events (capacity and registrations;
   the registered cell shows a fill bar). Both have a type (Upcoming, Live now, Recurring) and their date, times and time
   zone on one line in the form (row 'when'), empty to start but for the zone, the device's; the calendar shows them in the
   page's zone. Then where (a place or online), who organises it and how many are expected. Their forms come in sections
   (form_sec): the same sections as their details. */
import { lorem, pad, ymd, add_d, page_tz, device_tz, zone_short } from '../lib/index.js';
import { bar_cell } from '../ui/index.js';
import { field_spec, option_list, STATUS, mail, tel } from './fields.js';
import { kind_spec, repeat_spec, where_f, org_f, audience_spec, event_before } from './event_fields.js';

/* a record's time zone in a table cell or its details: "GMT+2 · Kigali" on its date (none: set in the page's) */
const tz_cell = (v, row) => zone_short(v || page_tz(), row?.date);
const place_cell = (v, row) => v === 'Virtual' ? 'Virtual' : row?.venue || '—';
/* the date row: date, start, end (required or not) and time zone */
const when_f = end_req => [field_spec('date', 'Date', 'date', 0, 1, { row: 'when' }), field_spec('start', 'Starts', 'time', 0, 1, { row: 'when' }),
  field_spec('end', 'Ends', 'time', 0, end_req, { row: 'when' }), field_spec('tz', 'Time zone', 'tz', 0, 1, { def: () => device_tz(), row: 'when' })];
const SEC = { When: 'kind,date,start,end,tz,repeat', Location: 'place,venue,link,join_note', Organiser: 'org_name,org_email,org_tel' };
/* seed rows: where and who */
const seed_more = () => { const n = lorem.name(), web = lorem.int(0, 3) === 0;
  return { place: web ? 'Virtual' : 'Physical', venue: web ? '' : lorem.t(2), link: web ? `https://meet.lorem.io/${lorem.w(1)}-${lorem.int(100, 999)}` : '',
    org_name: n, org_email: mail(n), org_tel: tel() }; };

export const activities_schema = {
  l: 'activity', n: 16, cols: ['title', 'kind', 'date', 'start', 'end', 'tz', 'category'], r: { tz: tz_cell, place: place_cell },
  form_sec: true, sec: { Details: 'title,category,note', ...SEC, Audience: 'audience' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('category', 'Category', 'select', option_list('Class|Meeting|Sport|Exam|Other')),
    field_spec('note', 'Note', 'textarea'), kind_spec(), ...when_f(1), repeat_spec(), ...where_f(), ...org_f(), audience_spec()
  ],
  before: event_before,
  g: i => {
    const h = lorem.int(7, 16);
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-6, 14))), start: `${pad(h)}:00`, end: `${pad(h + lorem.int(1, 2))}:${lorem.pick(['00', '30'])}`,
      category: lorem.pick(['Class', 'Meeting', 'Sport', 'Exam']), note: lorem.s(), kind: i % 4 === 1 ? 'Recurring' : 'Upcoming',
      repeat: i % 4 === 1 ? { freq: ['weekly', 'weekdays', 'monthly', 'daily'][i % 16 >> 2], every: 1, end: 'never' } : null, ...seed_more(), audience: lorem.int(5, 40)
    };
  }
};

export const events_schema = {
  l: 'event', n: 6, cols: ['title', 'kind', 'date', 'start', 'tz', 'place', 'registered', 'status'],
  form_sec: true, sec: { Details: 'title,about,status', ...SEC, Audience: 'audience,capacity,registered' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('about', 'Description', 'textarea'),
    field_spec('status', 'Status', 'select', STATUS.ev, 1, { def: () => 'Planned' }), kind_spec(), ...when_f(0), repeat_spec(),
    field_spec('venue', 'Venue'), field_spec('capacity', 'Capacity', 'number', 0, 1, { min: 1, def: () => 100 }),
    field_spec('registered', 'Registered', 'number', 0, 0, { min: 0, def: () => 0 })
  ],
  r: { registered: (v, row) => bar_cell(v, row.capacity), tz: tz_cell },
  before: (d, row, f) => when_ok(d, row, f) ? repeat_in(d, f) : false,
  g: i => {
    const c = lorem.int(4, 20) * 10;
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-10, 30))), start: `${pad(lorem.int(9, 16))}:00`, venue: lorem.t(2), capacity: c,
      registered: lorem.int(0, c), status: lorem.pick(STATUS.ev), about: lorem.s(), kind: i === 2 ? 'Recurring' : 'Upcoming',
      repeat: i === 2 ? { freq: 'monthly', every: 1, by: 'week', end: 'after', count: 6 } : null
    };
  }
};
