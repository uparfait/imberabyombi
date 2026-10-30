/* modules/people_views.jsx: the people modules: Staff (role-based access, copy a personal access link per row), Employees
   (by department), Attendance (live clock, check in / out, today's numbers) and Students (registration, bulletins, payments). */
import { VIEWS } from './views.js';
import { db, ui, after_render, TIMERS } from '../store/index.js';
import { auth, me, access_link } from '../auth/index.js';
import { ymd, fmt_d, money, qs, fmt_stamp } from '../lib/index.js';
import { ic, i3 } from '../icons/index.js';
import { badge, tabs, stat_row } from '../ui/index.js';
import { DEPTS } from '../schemas/index.js';
import { crud } from '../table/index.js';
import { to } from '../router/index.js';

const copy_link = r => <button className="icon_btn h-8 w-8" data-act="copy" data-text={access_link(r)} aria-label={`Copy access link for ${r.name}`}
  data-tip="Copy access link">
  {ic('link', 'h-4 w-4')}</button>;
VIEWS.staff = () => <>
  <section className="card mb-6 flex flex-wrap items-center gap-4 p-5">{i3('shield', 'h-12 w-12', 'violet')}<div className="min-w-[12rem] flex-1">
    <h2 className="text-base">Role-based access</h2>
