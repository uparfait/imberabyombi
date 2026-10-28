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
