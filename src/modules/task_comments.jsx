/* modules/task_comments.jsx: the task view's comments: who wrote each and when, your own with edit / delete (the pen swaps
   the text for an editor while st.cedit[comment id] is on), then the box to add one. */
import { ic } from '../icons/index.js';
import { me } from '../auth/index.js';
import { avatar } from '../ui/index.js';
import { comments_of } from './task_data.js';
import { ago } from './task_dates.jsx';

const editor = c => <div className="mt-2 grid gap-2" data-comment-editor=""><textarea rows={3} aria-label="Edit your comment" defaultValue={c.text}></textarea>
  <div className="flex justify-end gap-2"><button type="button" className="btn btn_ghost btn_sm" data-act="comment_cancel">Cancel</button>
