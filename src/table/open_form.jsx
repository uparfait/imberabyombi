/* table/open_form.jsx: the add / edit form of a record (open_form), from its schema's fields, and sync_when: the fields
   that only some statuses use. File fields are <File_box/> already (field() draws them), so nothing is wrapped here. */
import { cap, qs, qsa } from '../lib/index.js';
import { db, ui, cur, rerender } from '../store/index.js';
import { schemas } from '../schemas/index.js';
import { notify } from '../feedback/index.js';
import { field, when_row } from '../fields/index.js';
