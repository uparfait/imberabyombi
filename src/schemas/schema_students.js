/* schemas/schema_students.js: academics: the students collection, their bulletin entries (scores per term and subject)
   and their payments (tuition, transport, meals…). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { field_spec, option_list, STATUS, GRADES, SUBJECTS, TERMS, names, tel } from './fields.js';

export const students_schema = {
  l: 'student', n: 18, cols: ['name', 'regno', 'grade', 'guardian', 'phone', 'status'], sec: { Student: 'name,regno,grade,dob,status', Guardian: 'guardian,phone' },
  f: [
    field_spec('name', 'Full name', 'text', 0, 1),
    field_spec('regno', 'Registration no.', 'text', 0, 1, { def: () => `LRM-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}` }),
    field_spec('grade', 'Class', 'select', GRADES, 1), field_spec('dob', 'Date of birth', 'date'), field_spec('guardian', 'Guardian'),
    field_spec('phone', 'Guardian phone', 'tel'), field_spec('status', 'Status', 'select', option_list('Active|Suspended|Graduated'))
  ],
  g: i => ({
