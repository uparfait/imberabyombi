/* ensure_mine.js: gives a person who signs in some tasks of their own (assigned to them, by them, one done), once,
   so My tasks, the calendar and the dashboard have something to show. */
import { lorem, hash_str, ymd, add_d } from '../lib/index.js';
import { db } from '../store/index.js';
import { people } from '../schemas/index.js';

export function ensure_mine(n) {
  const t = db.list('tasks'); if (t.some(x => x.assignee === n || x.by === n)) return;
  const p = people().filter(x => x !== n), d = o => ymd(add_d(new Date(), o)); lorem.seed(hash_str(n));
  [{ assignee: n, by: n, due: d(2), priority: 'High', status: 'In progress' }, { assignee: n, by: p[0], due: d(4), priority: 'Medium', status: 'To do' },
