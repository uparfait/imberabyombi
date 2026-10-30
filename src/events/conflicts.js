/* events/conflicts.js: activities and events that clash with one being saved: the same venue or the same organiser at an
   overlapping time. Times are compared as instants, each in its own time zone (9:00 in Kigali is 8:00 in London). A
   recurring one is compared on each of its days for six months. Cancelled events and dates not set yet are left out.
   clash_ok(): the form says what it overlaps; saving again with the same timing keeps it anyway. */
import { repeat_dates, ymd, add_d, parse_d, fmt_d, fmt_time, zone_short, page_tz } from '../lib/index.js';
import { db } from '../store/index.js';
import { show_msg } from '../feedback/index.js';
import { at } from '../schemas/event_fields.js';

const spans = (r, from, to) => { if (!r.date || r.tbd || r.status === 'Cancelled') return [];
  const days = r.kind === 'Recurring' && r.repeat ? repeat_dates(r.repeat, r.date, from, to) : r.date >= from && r.date <= to ? [r.date] : [];
  return days.map(d => { const s = at(d, r.start, r.tz); return [s, r.end ? at(d, r.end, r.tz) : s + 2 * 3600e3, d]; }); };
const low = v => String(v || '').trim().toLowerCase();
const same_place = (a, b) => a.place !== 'Virtual' && b.place !== 'Virtual' && !!low(a.venue) && low(a.venue) === low(b.venue);
const same_host = (a, b) => !!low(a.org_email) && low(a.org_email) === low(b.org_email);

export function conflicts(r, self) {
  if (!r.date) return [];
  const p = parse_d(r.date), from = ymd(add_d(p, -1)), to = ymd(add_d(p, r.kind === 'Recurring' ? 183 : 1)), mine = spans(r, from, to);
  return mine.length ? ['events', 'activities'].flatMap(c => db.list(c).filter(o => o.id !== self && (same_place(r, o) || same_host(r, o))).flatMap(o => {
    const hit = spans(o, from, to).find(([s, e]) => mine.some(([a, b]) => a < e && s < b));
