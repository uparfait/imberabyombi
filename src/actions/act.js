/* actions/act.js: ACT, every [data-act] button's handler, ACT[name](t, e), and REQ, which of them are requests.
   ACT = { ...shell, ...tables, ...picker, ...files, ...admin, ...roles, ...calendar, ...records, ...demo, ...TASK_ACT }.
   The task handlers (modules) are looked up when a button is pressed, not copied at load: modules and actions import each
   other, and a copy made while modules is still loading would fail. */
import * as modules from '../modules/index.js';
