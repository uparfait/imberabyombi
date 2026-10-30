/* schemas/schema_attendees.js: who signed in to an event or activity (its QR code, /attend/<c>/<id>): full name, email,
   telephone, organisation or unit, position, how they signed (drawn or digital) and when. ref and c: the event or
   activity. The table of one event's attendees exports like any other. */
import { fmt_stamp } from '../lib/index.js';
import { field_spec } from './fields.js';

export const attendees_schema = {
  l: 'attendee', n: 0, cols: ['name', 'email', 'tel', 'org', 'position', 'sig_kind', 'at'],
  f: [
