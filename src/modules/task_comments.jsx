/* modules/task_comments.jsx: the task view's comments: who wrote each and when, your own with edit / delete (the pen swaps
   the text for an editor while st.cedit[comment id] is on), then the box to add one. */
import { ic } from '../icons/index.js';
import { me } from '../auth/index.js';
import { avatar } from '../ui/index.js';
import { comments_of } from './task_data.js';
import { ago } from './task_dates.jsx';

const editor = c => <div className="mt-2 grid gap-2" data-comment-editor=""><textarea rows={3} aria-label="Edit your comment" defaultValue={c.text}></textarea>
  <div className="flex justify-end gap-2"><button type="button" className="btn btn_ghost btn_sm" data-act="comment_cancel">Cancel</button>
    <button type="button" className="btn btn_primary btn_sm" data-act="comment_save">{ic('check', 'h-4 w-4')}Save</button></div></div>;

/* r: the task, c: the comment, on: its editor is open */
const comment = (r, c, on) => <li key={c.id} className="flex gap-3">{avatar(c.by)}
  <div className="min-w-0 flex-1 rounded-2xl bg-surface-2 px-4 py-2.5" data-comment={c.id}>
  <p className="flex items-center gap-2 text-sm"><b className="font-medium">{c.by === me() ? 'You' : c.by}</b><time className="text-xs text-muted">
    {`${ago(c.at)}${c.edited ? ' · edited' : ''}`}</time>
    {c.by === me() ? <span className="ml-auto flex">
      <button type="button" className="icon_btn h-7 w-7" data-act="comment_edit" aria-label="Edit comment" disabled={on}>{ic('edit', 'h-3.5 w-3.5')}</button>
      <button type="button" className="icon_btn h-7 w-7" data-act="comment_del" data-id={r.id} data-c={c.id} aria-label="Delete comment">
        {ic('trash', 'h-3.5 w-3.5')}</button></span> : null}</p>
  <p className="mt-0.5 whitespace-pre-line text-sm [overflow-wrap:anywhere]" data-comment-text="" hidden={on}>{c.text}</p>{on ? editor(c) : null}</div></li>;

export function tv_comments(r, st) {
  const cm = comments_of(r);
  return <section aria-label="Comments"><h3 className="flex items-center gap-2 text-base">Comments <span className="chip bg-surface-2 text-muted">{cm.length}</span></h3>
    {cm.length ? <ul className="mt-3 grid gap-3">{cm.map(c => comment(r, c, !!st.cedit[c.id]))}</ul> : <p className="mt-2 text-sm text-muted">No comments yet.</p>}
    <div className="mt-3 flex items-end gap-2"><div className="field min-w-0 flex-1"><label htmlFor="tv_comment">Add a comment</label>
      <textarea id="tv_comment" rows={2} placeholder=" " data-comment-box=""></textarea></div>
      <button type="button" className="btn btn_primary btn_sm mb-1" data-act="task_comment" data-id={r.id}>Comment</button></div></section>;
}
