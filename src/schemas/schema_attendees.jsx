/* schemas/schema_attendees.js: who signed in to an event or activity (its QR code, /attend/<c>/<id>): full name, email,
   telephone, organisation or unit, position, how they signed (drawn or digital) and when. ref and c: the event or
   activity. The table of one event's attendees exports like any other, without filters (export_filters: false). */
import { fmt_stamp } from '../lib/index.js';
import { field_spec } from './fields.js';

export const attendees_schema = {
  l: 'attendee', n: 0, export_filters: false, cols: ['name', 'email', 'tel', 'org', 'position', 'sig_kind', 'at'],
  f: [
    field_spec('name', 'Full name', 'text', 0, 1), field_spec('email', 'Email', 'email', 0, 1), field_spec('tel', 'Telephone', 'tel'),
    field_spec('org', 'Organisation or unit'), field_spec('position', 'Position'),
    field_spec('sig_kind', 'Signed', 'select', ['Drawn', 'Digital', 'By hand'], 0, { def: () => 'By hand' }),
    field_spec('at', 'Time', 'hidden', 0, 0, { def: () => new Date().toISOString() }),
    field_spec('ref', 'Event', 'hidden'), field_spec('c', 'Kind', 'hidden'), field_spec('sig', 'Signature', 'hidden', 0, 0, { form: false })
  ],
  r: { at: v => v ? fmt_stamp(v) : '', sig: (v, row) => !v ? '' : row.sig_kind === 'Drawn' ? <img src={v} alt="Signature" className="h-14 w-auto rounded bg-white p-1" /> : <code className="text-xs">{v}</code> },
  g: () => ({})
};
