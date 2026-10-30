/* actions/act.js: ACT, every [data-act] button's handler, ACT[name](t, e), and REQ, which of them are requests.
   ACT = { ...shell, ...tables, ...picker, ...files, ...admin, ...roles, ...calendar, ...records, ...demo, ...TASK_ACT, ...EV_ACT }.
   The task and event handlers (modules) are looked up when a button is pressed, not copied at load: modules and actions import each
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
const task = () => { try { return { ...modules.TASK_ACT, ...modules.EV_ACT }; } catch { return {}; } };
const has = (o, k) => Object.hasOwn(o, k);

/* behaves like the plain merged object: ACT[k], k in ACT, Object.keys(ACT) */
export const ACT = new Proxy(OWN, {
  get: (o, k) => (has(o, k) ? o[k] : has(task(), k) ? task()[k] : undefined),
  has: (o, k) => has(o, k) || has(task(), k),
  ownKeys: o => [...new Set([...Reflect.ownKeys(o), ...Reflect.ownKeys(task())])],
  getOwnPropertyDescriptor: (o, k) => Reflect.getOwnPropertyDescriptor(o, k) || (has(task(), k) ? { value: task()[k], writable: true, enumerable: true, configurable: true } : undefined)
});

/* data-act buttons that are requests. 1 = a change (delete, update, export…): the button spins; 2 = a get (open details,
   page, sort, switch tab, week or template…). Both show the top #loader on staff pages. On public and sign-in pages a get
   runs at once with no loader (there is nothing to fetch there). */
export const REQ = { view: 2, row: 2, viz_open: 2, viz_page: 2, edit: 2, ev: 2, page: 2, sort: 2, tab: 2, mail: 2, report: 2, role_sel: 2, cal_nav: 2, cal_today: 2, goday: 2,
  task_open: 2, clock: 1, return: 1, res: 1, data_export: 1, tok_reset: 1, note_del: 1, tz_save: 1, ev_restore: 1, ev_done: 1 };

/* a module loaded on demand (O-Doc Sign) adds its buttons' handlers when its code arrives: add_act(handlers, requests) */
export const add_act = (acts, req = {}) => { Object.assign(OWN, acts); Object.assign(REQ, req); };
