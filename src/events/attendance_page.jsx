/* events/attendance_page.jsx: everyone who attended one event or activity (/admin/events/<id>/attendance,
   /admin/calendar/<id>/attendance): the usual table, so it searches, sorts, pages and exports (CSV, JSON, Excel); a row
   shows the person and their signature. Someone can be added by hand. */
import { db, route } from '../store/index.js';
import { ic } from '../icons/index.js';
import { empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { crud } from '../table/index.js';
import { BASE } from './attend_side.jsx';

export function attendance_page(id, c) {
  const e = db.find(c, id), back = `${BASE[c]}/${id}`;
  if (!e) return empty('Not found', 'It may have been deleted.', null, 'alert', 'warn');
  route.title = `Attendance · ${e.title}`;
  return <div className="ev_page">
    <div className="ev_head"><a href={to(back)} className="icon_btn ev_back" aria-label="Back" data-tip="Back">{ic('chev_l')}</a><h2 className="ev_title">{e.title}</h2></div>
    {crud('attendees', { title: 'Attended', mod: c === 'events' ? 'events' : 'calendar', filter: a => a.ref === id, preset: { ref: id, c } })}</div>;
}
