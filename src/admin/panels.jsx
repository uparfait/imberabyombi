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
    <span className="status_dot" data-s={t.status} aria-hidden="true"></span>
    <span className="min-w-0 flex-1"><span className={`block truncate text-sm font-medium ${d ? 'text-muted line-through' : ''}`}>{t.title}</span>
      <span className="mt-0.5 flex flex-wrap items-center gap-x-2">{t.due ? due_tag(t) : null}
        {items.length ? <span className="text-xs text-muted">{`${items.filter(x => x.done).length}/${items.length} items`}</span> : null}</span></span>
    <span className="chip bg-surface-2 text-muted">{t.status}</span></button></li>; };

const my_tasks = () => {
  const all = db.list('tasks').filter(t => t.assignee === me()), open = all.filter(t => t.status !== 'Done'), done = all.filter(t => t.status === 'Done');
  return <><button className="btn btn_ghost btn_sm -ml-2 text-accent" data-act="create" data-mod="tasks" data-col="tasks">{ic('plus', 'h-4 w-4')}Add a task</button>
    {open.length ? <ul className="mt-1 grid">{open.map(task_row)}</ul> : empty('All tasks complete', 'Nice work. New tasks assigned to you will show up here.')}
    {done.length ? <details className="done_list mt-2"><summary>{`Completed (${done.length})`}</summary><ul className="grid">{done.map(task_row)}</ul></details> : null}</>; };

const HELP = [['How do roles decide what I see?', 'Each role has a level per module: no access, view, or manage. Super Admin sees everything.'],
  ['How do I share an access link?', 'Open Staff, then use the link button on a row. Roles also have an invite link.'],
  ['Where is my data stored?', 'In this browser only (localStorage). Export a backup from Settings.'],
  ['How do I change the brand colour?', 'Settings, Appearance, Brand colour. Or edit --brand in the stylesheet.'],
  ['How do I check a car out?', 'Open Smart parking and select a busy slot, or use Check out in the log.']];

/* search_box(attrs, placeholder): attrs is a props object spread on the search input */
const help = () => <>{search_box({ 'data-filter': '.accordion_item' }, 'Search help')}
  <div className="accordion mt-4">{HELP.map(([q, a]) => <details key={q} className="accordion_item"><summary className="text-sm">{q}</summary>
