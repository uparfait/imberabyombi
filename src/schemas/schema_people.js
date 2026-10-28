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
    const n = lorem.name();
    return { name: n, email: mail(n), role: lorem.pick(ROLES0.slice(1)).id, phone: tel(), status: lorem.pick(['Active', 'Active', 'Active', 'On leave', 'Inactive']) };
  }
};

export const employees_schema = {
  l: 'employee', n: 16, cols: ['name', 'dept', 'position', 'shift', 'phone', 'status'],
  sec: { Person: 'name,phone', Job: 'dept,position,shift', Employment: 'salary,status' },
  f: [
    field_spec('name', 'Full name', 'text', 0, 1), field_spec('dept', 'Department', 'select', DEPTS, 1), field_spec('position', 'Position'),
    field_spec('shift', 'Shift', 'select', option_list('Morning|Day|Evening|Night')), field_spec('phone', 'Phone', 'tel'),
    field_spec('salary', 'Monthly salary', 'number', 0, 0, { min: 0 }), field_spec('status', 'Status', 'select', STATUS.staff)
  ],
  g: () => ({
    name: lorem.name(), dept: lorem.pick(DEPTS), position: lorem.t(2), shift: lorem.pick(['Morning', 'Day', 'Evening']), phone: tel(),
