/* events/attend_side.jsx: attendance under an event's status, compact so the card needs no scrolling: a small QR code
   while attendance is open or about to open (att_window.js; a click shows it on the whole screen: qr_full.jsx), "Opens
   in" or "Closes in", and beside it how many
   attended (live; past 99 it shows 99+; it opens their table), Copy link (once it is over: Attendance, their table), and Open: the event's other pages as tiles (the system's tile menu).
   att_count() and the paths are shared with the live screen. */
import { db } from '../store/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { Qr } from './qr.jsx';
import { tile_menu } from '../admin/tile_menu.jsx';
import { qr_full } from './qr_full.jsx';
import { att_phase } from './att_window.js';

export const BASE = { events: '/admin/events', activities: '/admin/calendar' };
export const att_count = id => db.list('attendees').filter(a => a.ref === id).length;
export const att_url = (c, id) => new URL(to(`/attend/${c}/${id}`), location.origin).href;
export const qr_open = st => ['Upcoming', 'Live', 'Recurring'].includes(st);

export function attend_side(e, c, st) {
  const url = att_url(c, e.id), n = att_count(e.id), page = `${BASE[c]}/${e.id}`, open = qr_open(st);
  const tiles = [...(open ? [{ icon: 'external', label: 'Attendance page', href: url }] : []), { icon: 'play', label: 'Live screen', href: to(page + '/live') },
    { icon: 'users', label: 'Attendees', href: to(page + '/attendance') }];
  return <div className={`ev_att ${open ? '' : 'ev_att_one'}`}>
    {open ? <button type="button" className="ev_qr_btn" data-act="ev_qr" data-id={e.id} aria-label="Show the QR code on the whole screen" data-tip="Full screen">
      <Qr text={url} label="Attendance QR code" /></button> : null}{open ? qr_full(e, url, n) : null}
    <div className="ev_att_side"><a href={to(page + '/attendance')} className="ev_count" data-tip={n > 99 ? `${n} attended` : undefined}><b>{n > 99 ? '99+' : n}</b> attended</a>
      {open ? <button type="button" className="btn btn_outline btn_sm" data-act="copy" data-text={url} data-what="Link">{ic('copy', 'h-4 w-4')}Copy link</button>
        : <a href={to(page + '/attendance')} className="btn btn_outline btn_sm">{ic('users', 'h-4 w-4')}Attendance</a>}
      {tile_menu({ id: `pop_links_${e.id}`, title: e.title, icon: false, label: 'Open', tiles })}</div>
  </div>;
}
