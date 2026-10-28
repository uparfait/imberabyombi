/* schemas/schema_attendance.js: the attendance collection: who checked in and out, when, and their status
   (staff and students; absent people have no times). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { field_spec, option_list, STATUS, names } from './fields.js';

export const attendance_schema = {
  l: 'attendance record', n: 42, cols: ['person', 'kind', 'date', 'in', 'out', 'status'],
