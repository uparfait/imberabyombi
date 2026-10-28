/* schemas/schema_people.js: the staff collection (form fields, table columns, detail sections, seed data) and the
   employees collection (people on the payroll: department, position, shift, salary). */
import { lorem } from '../lib/index.js';
import { roles, ROLES0 } from '../auth/index.js';
import { field_spec, option_list, STATUS, DEPTS, mail, tel } from './fields.js';

export const staff_schema = {
  l: 'staff member', n: 12, cols: ['name', 'email', 'role', 'phone', 'status'], sec: { Profile: 'name,email,phone', Access: 'role,status' },
  f: [
    field_spec('name', 'Full name', 'text', 0, 1), field_spec('email', 'Email', 'email', 0, 1),
    field_spec('role', 'Role', 'select', () => roles().map(r => [r.id, r.name]), 1), field_spec('phone', 'Phone', 'tel'),
    field_spec('status', 'Status', 'select', STATUS.staff)
  ],
  g: () => {
