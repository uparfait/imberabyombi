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
    name: lorem.name(), regno: `LRM-2026-${pad(i + 1)}0`, grade: lorem.pick(GRADES), dob: ymd(new Date(lorem.int(2012, 2019), lorem.int(0, 11), lorem.int(1, 28))),
    guardian: lorem.name(), phone: tel(), status: lorem.pick(['Active', 'Active', 'Active', 'Graduated'])
  })
};

export const bulletins_schema = {
  l: 'bulletin entry', n: 40, cols: ['student', 'term', 'subject', 'score', 'remark'],
  f: [
    field_spec('student', 'Student', 'list', () => names('students'), 1), field_spec('term', 'Term', 'select', TERMS, 1),
    field_spec('subject', 'Subject', 'select', SUBJECTS, 1), field_spec('score', 'Score (0–100)', 'number', 0, 1, { min: 0, max: 100 }), field_spec('remark', 'Remark')
  ],
  g: () => ({ student: lorem.pick(db.list('students')).name, term: lorem.pick(TERMS), subject: lorem.pick(SUBJECTS), score: lorem.int(42, 99), remark: lorem.t(2) })
};

export const payments_schema = {
  l: 'payment', n: 20, cols: ['student', 'item', 'amount', 'method', 'date', 'status'],
  f: [
    field_spec('student', 'Student', 'list', () => names('students'), 1),
    field_spec('item', 'For', 'select', option_list('Tuition|Transport|Meals|Uniform|Library fine'), 1),
    field_spec('amount', 'Amount', 'number', 0, 1, { min: 0 }), field_spec('method', 'Method', 'select', option_list('Cash|Mobile money|Bank|Card')),
