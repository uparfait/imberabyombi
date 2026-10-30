/* schemas/schema_events.js: calendar activities (classes, meetings, sport, exams) and events (capacity and registrations;
   the registered cell shows a fill bar). Both have a type (Upcoming, Live now, Recurring) and their date, times and time
   zone on one line in the form (row 'when'), empty to start but for the zone, the device's; the calendar shows them in the
   page's zone. Then where (a place or online), who organises it and how many are expected. Their forms come in sections
   (form_sec): the same sections as their details. An event's status (Scheduled, Postponed, Cancelled, Completed) is
   changed by the actions on its page, not in its form; the table shows where it stands (events/ev_state.js). */
import { lorem, pad, ymd, add_d, page_tz, device_tz, zone_short } from '../lib/index.js';
import { bar_cell, badge, tag } from '../ui/index.js';
import { ev_state } from '../events/ev_state.js';
import { field_spec, option_list, STATUS, mail, tel } from './fields.js';
import { kind_spec, kind_label, repeat_spec, where_f, org_f, audience_spec, agenda_spec, event_before } from './event_fields.js';

/* a record's time zone in a table cell or its details: "GMT+2 · Kigali" on its date (none: set in the page's) */
const tz_cell = (v, row) => zone_short(v || page_tz(), row?.date);
const place_cell = (v, row) => v === 'Virtual' ? 'Virtual' : row?.venue || '—';
const kind_cell = (v, row) => tag(kind_label(row || {}));
/* the date row: date, start, end (required or not) and time zone */
const when_f = end_req => [field_spec('date', 'Date', 'date', 0, 1, { row: 'when' }), field_spec('start', 'Starts', 'time', 0, 1, { row: 'when' }),
  field_spec('end', 'Ends', 'time', 0, end_req, { row: 'when' }), field_spec('tz', 'Time zone', 'tz', 0, 1, { def: () => device_tz(), fill: () => page_tz(), row: 'when' })];
/* (a record saved without a zone was set in the page's: the calendar reads it so too) */
const SEC = { When: 'kind,date,start,end,tz,repeat', Location: 'place,venue,link,join_note', Organiser: 'org_name,org_email,org_tel,co_orgs' };
/* seed rows: an agenda from the start hour, where and who */
const hm = (h, m) => `${String(h + Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const ag_seed = h => [[0, 30, 'Welcome'], [30, 90, 'Main session'], [90, 120, 'Questions']].map(([a, b, t]) => { const n = lorem.name();
  return { from: hm(h, a), to: hm(h, b), title: t, desc: lorem.s(), p_name: n, p_email: mail(n), p_title: lorem.pick(['Director', 'Coordinator', 'Guest speaker']) }; });
const seed_more = () => { const n = lorem.name(), web = lorem.int(0, 3) === 0;
  return { place: web ? 'Virtual' : 'Physical', venue: web ? '' : lorem.t(2), link: web ? `https://meet.lorem.io/${lorem.w(1)}-${lorem.int(100, 999)}` : '',
    org_name: n, org_email: mail(n), org_tel: tel() }; };

export const activities_schema = {
  l: 'activity', n: 16, cols: ['title', 'kind', 'date', 'start', 'end', 'tz', 'category'], r: { tz: tz_cell, place: place_cell, kind: kind_cell },
  form_sec: true, sec: { Details: 'title,category,note', ...SEC, Agenda: 'agenda', Audience: 'audience' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('category', 'Category', 'select', option_list('Class|Meeting|Sport|Exam|Other')),
    field_spec('note', 'Note', 'textarea'), kind_spec(), ...when_f(1), repeat_spec(), ...where_f(), ...org_f(), agenda_spec(), audience_spec()
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
  form_sec: true, sec: { Details: 'title,about', ...SEC, Agenda: 'agenda', Audience: 'audience,capacity,registered' },
  f: [
    field_spec('title', 'Title', 'text', 0, 1), field_spec('about', 'Description', 'textarea'),
    field_spec('status', 'Status', 'select', STATUS.ev, 1, { def: () => 'Scheduled', form: false }), kind_spec(), ...when_f(0), repeat_spec(), ...where_f(), ...org_f(),
    agenda_spec(), audience_spec(), field_spec('capacity', 'Capacity', 'number', 0, 1, { min: 1, def: () => 100 }),
    field_spec('registered', 'Registered', 'number', 0, 0, { min: 0, def: () => 0 })
  ],
  r: { registered: (v, row) => bar_cell(v, row.capacity), tz: tz_cell, place: place_cell, kind: kind_cell, status: (v, row) => badge(ev_state(row)) },
  before: event_before,
  g: i => {
    const c = lorem.int(4, 20) * 10, h = lorem.int(9, 15);
    return {
      title: lorem.t(3), date: ymd(add_d(new Date(), lorem.int(-10, 30))), start: `${pad(h)}:00`, end: hm(h, 120), venue: lorem.t(2), capacity: c,
      registered: lorem.int(0, c), status: ['Scheduled', 'Scheduled', 'Scheduled', 'Postponed', 'Scheduled', 'Cancelled'][i], about: lorem.s(), kind: i === 2 ? 'Recurring' : 'Upcoming',
      repeat: i === 2 ? { freq: 'monthly', every: 1, by: 'week', end: 'after', count: 6 } : null, ...seed_more(), audience: Math.round(c * .8)
    };
  }
};
