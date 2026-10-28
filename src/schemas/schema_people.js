/* schemas/schema_people.js: the staff collection (form fields, table columns, detail sections, seed data) and the
   employees collection (people on the payroll: department, position, shift, salary). */
import { lorem } from '../lib/index.js';
import { roles, ROLES0 } from '../auth/index.js';
import { field_spec, option_list, STATUS, DEPTS, mail, tel } from './fields.js';
