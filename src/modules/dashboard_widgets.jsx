/* modules/dashboard_widgets.jsx: the dashboard cards a role may see, in this order: attendance this week
   (chart), my tasks, coming up (calendar), low stock, parking. */
import { db, after_render } from '../store/index.js';
import { auth } from '../auth/index.js';
import { add_d, ymd, parse_d, qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { i3 } from '../icons/index.js';
import { badge, stock_cell } from '../ui/index.js';
import { draw_chart } from '../charts/index.js';
import { cal_items } from '../admin/index.js';
import { due_tag } from './task_dates.jsx';
import { to } from '../router/index.js';

const head = (title, path, link) => <header className="flex items-center justify-between"><h2 className="text-lg">{title}</h2>
  <a href={to(path)} className="btn btn_ghost btn_sm">{link}</a></header>;
const none = text => <li className="text-sm text-muted">{text}</li>;

const task_li = x => <li key={x.id}><button type="button" className="task_row" data-act="task_open" data-id={x.id}>
  <span className="status_dot" data-s={x.status} aria-hidden="true"></span>
  <span className="min-w-0 flex-1"><span className="block truncate text-sm">{x.title}</span>{x.due ? due_tag(x) : null}</span>{badge(x.priority)}</button></li>;
const up_li = i => <li key={i.c + i.id} className="flex gap-3">
  <time dateTime={`${i.date}T${i.start}`} className="grid w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 py-1.5 leading-tight text-accent">
    <b className="font-display text-lg">{parse_d(i.date).getDate()}</b><small className="text-[0.625rem]">
      {parse_d(i.date).toLocaleDateString(undefined, { month: 'short' })}</small></time>
  <div className="min-w-0"><p className="truncate text-sm font-medium">{i.title}</p><p className="text-xs text-muted">{`${i.start} – ${i.end}`}</p></div></li>;

/* u: the signed-in person. Returns the cards as a list (each keyed) */
export function dash_widgets(u) {
  const W = [];
  if (auth.can('attendance')) {
    const days = Array.from({ length: 7 }, (_, i) => add_d(new Date(), i - 6)), att = db.list('attendance');
    const lab = days.map(d => d.toLocaleDateString(undefined, { weekday: 'short' }));
    const val = days.map(d => att.filter(a => a.date === ymd(d) && a.status !== 'Absent').length);
    after_render(() => draw_chart(qs('#chart_week'), lab, val));
    W.push(<section key="att" className="card p-5 lg:col-span-2">{head('Attendance this week', '/admin/attendance', 'Open')}
      <canvas id="chart_week" className="mt-4 h-64 w-full" role="img" aria-label={`People present per day, last 7 days: ${val.join(', ')}`}></canvas></section>);
  }
  { const mine = db.list('tasks').filter(x => x.assignee === u.name), done = mine.filter(x => x.status === 'Done').length;
    const open = mine.filter(x => x.status !== 'Done').slice(0, 4);
    W.push(<section key="tasks" className="card p-5">{head('My tasks', '/admin/tasks', 'Open')}<p className="mt-1 text-sm text-muted">
      {`${done} of ${mine.length} done`}</p>
      <progress className="mt-3" max={mine.length || 1} value={done}></progress>
      <ul className="mt-4 grid gap-3">{open.length ? open.map(task_li) : none('All tasks complete.')}</ul></section>); }
  if (auth.can('calendar')) { const up = cal_items().filter(i => i.date >= ymd()).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)).slice(0, 5);
    W.push(<section key="cal" className="card p-5">{head('Coming up', '/admin/calendar', 'Calendar')}<ol className="mt-4 grid gap-3">
      {up.length ? up.map(up_li) : none('Nothing scheduled.')}</ol></section>); }
  if (auth.can('inventory')) { const low = db.list('inventory').filter(i => +i.qty < +i.min).slice(0, 4);
    W.push(<section key="stock" className="card p-5">{head('Low stock', '/admin/inventory', 'Inventory')}
      <ul className="mt-4 grid gap-4">{low.length ? low.map(i => <li key={i.id}><p className="mb-1 text-sm font-medium">{i.item}</p>{stock_cell(i.qty, i)}
        </li>) : none('Every item is above its minimum.')}</ul></section>); }
  if (auth.can('parking')) { const n = db.list('parking').filter(p => p.status === 'Parked').length, N = cfg.parking_slots;
    W.push(<section key="park" className="card p-5">{head('Parking', '/admin/parking', 'Open')}
      <div className="mt-4 flex items-center gap-4">{i3('car', 'h-14 w-14', 'sky')}<p><b className="font-display text-3xl">{n}</b><span className="text-muted">
        {` / ${N} slots`}</span></p></div>
      <meter className="mt-4" min="0" max={N} low={N * .6} high={N * .85} optimum="0" value={n}></meter></section>); }
  return W;
}
