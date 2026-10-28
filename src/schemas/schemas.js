/* schemas/schemas.js: SCHEMAS. One object per collection drives forms, tables, CSV and seed data:
   l = singular label, n = seed rows, cols = table columns, sec = detail sections, f = fields (field_spec), r = cell renderers
   (value, row) → JSX, before = (data, row, form) → record to save or false, g = seed row generator (index) → record. */
import { lorem, hash_str, uid } from '../lib/index.js';
import { set_seeder } from '../store/index.js';
import { staff_schema, employees_schema } from './schema_people.js';
import { attendance_schema } from './schema_attendance.js';
import { tasks_schema } from './schema_tasks.js';
