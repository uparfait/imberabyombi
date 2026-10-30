/* actions/act.js: ACT, every [data-act] button's handler, ACT[name](t, e), and REQ, which of them are requests.
   ACT = { ...shell, ...tables, ...picker, ...files, ...admin, ...roles, ...calendar, ...records, ...demo, ...TASK_ACT }.
   The task handlers (modules) are looked up when a button is pressed, not copied at load: modules and actions import each
   other, and a copy made while modules is still loading would fail. */
import * as modules from '../modules/index.js';
import { SHELL_ACT } from './act_shell.js';
import { TABLE_ACT } from './act_tables.jsx';
import { PICKER_ACT } from './act_picker.js';
import { FILE_ACT } from './act_files.js';
import { ADMIN_ACT } from './act_admin.js';
import { ROLE_ACT } from './act_roles.jsx';
import { CALENDAR_ACT } from './act_calendar.jsx';
import { RECORD_ACT } from './act_records.jsx';
import { DEMO_ACT } from './act_demo.js';

const OWN = { ...SHELL_ACT, ...TABLE_ACT, ...PICKER_ACT, ...FILE_ACT, ...ADMIN_ACT, ...ROLE_ACT, ...CALENDAR_ACT, ...RECORD_ACT, ...DEMO_ACT };
