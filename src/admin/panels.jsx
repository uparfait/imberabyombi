/* panels.jsx: side panels (Imberabyombi style): Imberabyombi notes, an Imberabyombi task list of my tasks, Help.
   Each: t = title, h() = body, tools() = extra header buttons. Drawn by panel_html(); refresh_panel() draws the open one again. */
import { fmt_stamp } from '../lib/index.js';
import { ic, i3 } from '../icons/index.js';
import { db } from '../store/index.js';
import { me } from '../auth/index.js';
import { empty, search_box } from '../ui/index.js';
import { due_tag, items_of } from '../modules/index.js';
import { to } from '../router/index.js';

const edited = at => 'Edited ' + fmt_stamp(at, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
const memo = n => <article key={n.id} className="memo"><h3>{n.title || 'Untitled'}</h3><p>{n.body}</p><footer><small>{n.at ? edited(n.at) : ''}</small>
  <button className="icon_btn h-8 w-8" data-act="note_del" data-id={n.id} aria-label="Delete note">{ic('trash', 'h-4 w-4')}</button></footer></article>;

const notes = () => { const ns = db.get('notes', []);
  return <><form data-form="note" className="compose" noValidate><div data-msg-slot="" className="mx-3 mt-3 empty:hidden"></div>
      <label className="sr-only" htmlFor="compose_title">Title</label><input id="compose_title" name="title" placeholder="Title" autoComplete="off" />
      <label className="sr-only" htmlFor="compose_body">Note</label><textarea id="compose_body" name="body" rows="1" required placeholder="Take a note…"></textarea>
      <div className="compose_foot"><button className="btn btn_ghost btn_sm text-accent">Done</button></div></form>
    <div className="mt-4 grid gap-2">{ns.length ? ns.map(memo)
      : <div className="grid justify-items-center gap-3 py-12 text-center">{i3('bulb', 'h-14 w-14', 'warn')}
        <p className="text-sm text-muted">Notes you add appear here.</p></div>}</div></>; };

const task_row = t => { const d = t.status === 'Done', items = items_of(t);
  return <li key={t.id}><button type="button" className="task_row" data-act="task_open" data-id={t.id}>
