/* modules/task_bits.jsx: small task pieces: a progress bar with "done/total", the subtask progress of a task (table cell)
   and the status row's Cancel / Save buttons. */
import { ic } from '../icons/index.js';
import { items_of } from './task_data.js';

export const bar = (d, n) => <span className="inline-flex items-center gap-2 whitespace-nowrap">
