/* schemas/schema_students.js: academics: the students collection, their bulletin entries (scores per term and subject)
   and their payments (tuition, transport, meals…). */
import { lorem, pad, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { field_spec, option_list, STATUS, GRADES, SUBJECTS, TERMS, names, tel } from './fields.js';

export const students_schema = {
