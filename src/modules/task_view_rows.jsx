/* modules/task_view_rows.jsx: the task view's table rows (Details, Assignment, Dates, Status). A row with a pen shows its
   editor while st.edit[row] is on; the attachment preview and the status' Cancel / Save follow st.prev and st.more. */
import { Fragment } from 'react';
import { fmt_dt } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { badge, person_you } from '../ui/index.js';
import { STATUS } from '../schemas/index.js';
import { task_own, task_mine, subs_of, files_of } from './task_data.js';
import { due_tag } from './task_dates.jsx';
import { bar, status_more } from './task_bits.jsx';
import { file_chip, file_preview } from './task_files.jsx';
import { tv_cell } from './tv_editor.jsx';

const dash = () => <span className="text-muted">—</span>;
const sec = t => <tr className="kv_group"><th scope="colgroup" colSpan={2}>{t}</th></tr>;
const pen = f => <button type="button" className="kv_pen" data-act="tv_edit" data-f={f} aria-label="Edit">{ic('edit', 'h-4 w-4')}</button>;
