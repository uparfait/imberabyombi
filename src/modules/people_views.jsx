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
    <p className="text-sm text-muted">{'Each person signs in with a role. The role decides which modules they can view or manage. '
      + 'Copy a personal access link from any row.'}</p></div>
    {auth.can('roles') ? <a href={to('/admin/roles')} className="btn btn_outline btn_sm">Manage roles</a> : null}</section>
  {crud('staff', { acts: copy_link })}
</>;

VIEWS.employees = () => { const t = ui.tab.emp || 'All', rows = db.list('employees');
  return <>{tabs('emp', [['All', 'All', rows.length], ...DEPTS.map(x => [x, x, rows.filter(r => r.dept === x).length])], t)}
    {crud('employees', { filter: t === 'All' ? null : r => r.dept === t, preset: t === 'All' ? {} : { dept: t }, title: t === 'All' ? 'All employees' : t })}</>; };

VIEWS.attendance = () => {
  const n = me(), td = ymd(), rows = db.list('attendance'), mine = rows.find(r => r.person === n && r.date === td), t = ui.tab.att || 'Staff';
  const today = rows.filter(r => r.date === td);
  after_render(() => TIMERS.push(setInterval(() => { const o = qs('#live_clock'); if (o) o.value = fmt_stamp(Date.now(), { timeStyle: 'medium' }); }, 1000)));
  const count = s => today.filter(r => r.status === s).length;
  return <>
    <section className="card mb-6 grid items-center gap-5 p-5 sm:grid-cols-[auto_1fr_auto] sm:p-6">{i3('clock', 'h-16 w-16', 'teal')}
      <div><p className="text-sm text-muted">{`Today, ${fmt_d(td)}`}</p>
        <output id="live_clock" className="bg-transparent p-0 font-display text-4xl font-bold text-fg">{fmt_stamp(Date.now(), { timeStyle: 'medium' })}</output>
        <p className="mt-1 text-sm text-muted">
          {mine ? `You checked in at ${mine.in}${mine.out ? ` and out at ${mine.out}` : ''}.` : 'You have not checked in today.'}</p></div>
      <div>{!mine ? <button className="btn btn_primary" data-act="clock" data-v="in">{ic('check', 'h-4 w-4')}Check in</button>
        : !mine.out ? <button className="btn btn_ink" data-act="clock" data-v="out">{ic('logout', 'h-4 w-4')}Check out</button> : badge(mine.status)}</div></section>
    {stat_row([['Present today', count('Present'), 'check', 'ok'], ['Late', count('Late'), 'clock', 'warn'], ['Absent', count('Absent'), 'x', 'bad'],
      ['Excused', count('Excused'), 'note', 'info']])}
    {tabs('att', [['Staff', 'Staff'], ['Student', 'Students']], t)}
    {crud('attendance', { filter: r => r.kind === t, preset: { kind: t }, title: `${t === 'Staff' ? 'Staff' : 'Student'} attendance` })}
  </>;
};

const bulletin = r => <button className="btn btn_soft btn_sm" data-act="report" data-name={r.name}>Bulletin</button>;
