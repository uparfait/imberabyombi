/* schemas/schemas.js: SCHEMAS. One object per collection drives forms, tables, CSV and seed data:
   l = singular label, n = seed rows, cols = table columns, sec = detail sections, f = fields (field_spec), r = cell renderers
   (value, row) → JSX, before = (data, row, form) → record to save or false, g = seed row generator (index) → record. */
import { lorem, hash_str, uid } from '../lib/index.js';
import { set_seeder } from '../store/index.js';
import { staff_schema, employees_schema } from './schema_people.js';
import { attendance_schema } from './schema_attendance.js';
import { tasks_schema } from './schema_tasks.js';
import { students_schema, bulletins_schema, payments_schema } from './schema_students.js';
import { books_schema, rentals_schema, declarations_schema } from './schema_library.js';
import { reservations_schema, inventory_schema } from './schema_inventory.js';
import { activities_schema, events_schema } from './schema_events.js';
import { parking_schema } from './schema_parking.js';
import { attendees_schema } from './schema_attendees.jsx';

export const schemas = {
  staff: staff_schema, employees: employees_schema, attendance: attendance_schema, tasks: tasks_schema, students: students_schema,
  bulletins: bulletins_schema, payments: payments_schema, books: books_schema, rentals: rentals_schema, declarations: declarations_schema,
  reservations: reservations_schema, inventory: inventory_schema, activities: activities_schema, events: events_schema, parking: parking_schema,
  attendees: attendees_schema
};

/* the first rows of a collection: seeded with the collection's name, so every browser starts with the same demo data */
export function seed(c) { const s = schemas[c]; if (!s) return []; lorem.seed(hash_str(c)); return Array.from({ length: s.n }, (_, i) => ({ id: uid(), ...s.g(i) })); }

/* db.list(c) seeds an empty collection through this (store/db.js does not import the schemas itself) */
set_seeder(seed);
