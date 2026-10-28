/* modules/tasks.jsx: VIEWS.tasks: your progress, then the tasks table in tabs (My own / Assigned to me / Delegated by me /
   All for admins). A row opens the task view; whoever may change a task gets a "Change status" button on its row. */
import { VIEWS } from './views.js';
import { db, ui } from '../store/index.js';
import { auth, me } from '../auth/index.js';
import { i3 } from '../icons/index.js';
import { tabs } from '../ui/index.js';
import { crud } from '../table/index.js';
import { task_own, task_mine } from './task_data.js';
