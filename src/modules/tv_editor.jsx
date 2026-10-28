/* modules/tv_editor.jsx: inline editors for one row of the task view. A pen turns the row's cell into its editor with
   Save / Cancel beside it (tv_cell); the fields are named tv_<row> (tv_title, tv_due…) and saved by TASK_ACT.tv_save. */
import { ic } from '../icons/index.js';
import { uniq } from '../lib/index.js';
import { me } from '../auth/index.js';
import { field_spec, STATUS, people } from '../schemas/index.js';
