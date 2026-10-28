/* modules/task_bits.jsx: small task pieces: a progress bar with "done/total", the subtask progress of a task (table cell)
   and the status row's Cancel / Save buttons. */
import { ic } from '../icons/index.js';
import { items_of } from './task_data.js';

export const bar = (d, n) => <span className="inline-flex items-center gap-2 whitespace-nowrap">
  <progress className="w-16" max={n || 1} value={d}></progress><span className="text-xs tabular-nums text-muted">{`${d}/${n}`}</span></span>;
export const sub_progress = r => { const a = items_of(r); return a.length ? bar(a.filter(x => x.done).length, a.length) : <span className="text-muted">—</span>; };

/* a status change is only Save / Cancel: Done records now as the completed time; the dates change with their own pens */
export const status_more = () => <div className="mt-3 flex justify-end gap-2">
  <button type="button" className="btn btn_ghost btn_sm" data-act="tv_status_cancel">Cancel</button>
