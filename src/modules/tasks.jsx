/* modules/tasks.jsx: VIEWS.tasks: your progress, then the tasks table in tabs (My own / Assigned to me / Delegated by me /
   All for admins). A row opens the task view; whoever may change a task gets a "Change status" button on its row. */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth, me } from '../auth/index.js';
import { i3 } from '../icons/index.js';
import { tabs } from '../ui/index.js';
import { crud } from '../table/index.js';
import { task_own, task_mine } from './task_data.js';
import { task_view } from './task_view.jsx';

const status_btn = r => task_mine(r) ? <button className="btn btn_soft btn_sm whitespace-nowrap" data-act="task_open" data-id={r.id}>Change status</button> : null;

VIEWS.tasks = () => {
  const n = me(), t = ui.tab.tasks || 'mine', all = db.list('tasks');
  const FL = { mine: r => r.assignee === n && r.by === n, assigned: r => r.assignee === n && r.by !== n,
    delegated: r => r.by === n && r.assignee !== n, all: () => true };
  const list = [['mine', 'My own tasks', all.filter(FL.mine).length], ['assigned', 'Assigned to me', all.filter(FL.assigned).length],
    ['delegated', 'Delegated by me', all.filter(FL.delegated).length], ...(auth.boss() ? [['all', 'All tasks', all.length]] : [])];
  const mine = all.filter(r => r.assignee === n), done = mine.filter(r => r.status === 'Done').length;
  const preset = t === 'mine' ? { assignee: n, by: n } : t === 'delegated' ? { by: n } : {};
