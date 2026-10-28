/* modules/dashboard_widgets.jsx: the dashboard cards a role may see, in the reference's order: attendance this week
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

const head = (title, href, link) => <header className="flex items-center justify-between"><h2 className="text-lg">{title}</h2>
  <a href={href} className="btn btn_ghost btn_sm">{link}</a></header>;
const none = text => <li className="text-sm text-muted">{text}</li>;

const task_li = x => <li key={x.id}><button type="button" className="task_row" data-act="task_open" data-id={x.id}>
  <span className="status_dot" data-s={x.status} aria-hidden="true"></span>
  <span className="min-w-0 flex-1"><span className="block truncate text-sm">{x.title}</span>{x.due ? due_tag(x) : null}</span>{badge(x.priority)}</button></li>;
const up_li = i => <li key={i.c + i.id} className="flex gap-3">
  <time dateTime={`${i.date}T${i.start}`} className="grid w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 py-1.5 leading-tight text-accent">
    <b className="font-display text-lg">{parse_d(i.date).getDate()}</b><small className="text-[10px]">
      {parse_d(i.date).toLocaleDateString(undefined, { month: 'short' })}</small></time>
  <div className="min-w-0"><p className="truncate text-sm font-medium">{i.title}</p><p className="text-xs text-muted">{`${i.start} – ${i.end}`}</p></div></li>;

/* u: the signed-in person. Returns the cards as a list (each keyed) */
export function dash_widgets(u) {
  const W = [];
