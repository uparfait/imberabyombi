/* schemas/schema_attendance.js: the attendance collection: who checked in and out, when, and their status
   (staff and students; absent people have no times). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { field_spec, option_list, STATUS, names } from './fields.js';

export const attendance_schema = {
  l: 'attendance record', n: 42, cols: ['person', 'kind', 'date', 'in', 'out', 'status'],
  f: [
    field_spec('person', 'Person', 'list', () => names('staff', 'students'), 1), field_spec('kind', 'Type', 'select', option_list('Staff|Student'), 1),
    field_spec('date', 'Date', 'date', 0, 1, { def: () => ymd() }), field_spec('in', 'Check in', 'time'), field_spec('out', 'Check out', 'time'),
    field_spec('status', 'Status', 'select', STATUS.att, 1)
  ],
  g: i => {
    const st = lorem.pick(['Present', 'Present', 'Present', 'Late', 'Absent', 'Excused']), kind = lorem.pick(['Staff', 'Student']), off = st === 'Absent';
