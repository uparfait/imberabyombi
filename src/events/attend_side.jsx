/* events/attend_side.jsx: attendance under an event's status, compact so the card needs no scrolling: "Opens in" or
   "Closes in" (att_window.js), whole, unless the status already counts to that moment (shown), then a small QR code while attendance is open (a click shows it on the whole screen:
   qr_full.jsx; before, its place stays empty; once over, "Finished"), and beside it how many attended (live; past 99 it
   shows 99+; it opens their table), Copy link (once over: Attendance, their table), and Open: the event's other pages
   as tiles (the system's tile menu).
   att_count() and the paths are shared with the live screen. */
import { db } from '../store/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { Qr } from './qr.jsx';
import { tile_menu } from '../admin/tile_menu.jsx';
import { qr_full } from './qr_full.jsx';
import { att_phase } from './att_window.js';
import { left } from './countdown.js';

export const BASE = { events: '/admin/events', activities: '/admin/calendar' };
export const att_count = id => db.list('attendees').filter(a => a.ref === id).length;
export const att_url = (c, id) => new URL(to(`/attend/${c}/${id}`), location.origin).href;

export function attend_side(e, c, can, shown) {
  const url = att_url(c, e.id), n = att_count(e.id), page = `${BASE[c]}/${e.id}`, ph = att_phase(e), open = ph[0] !== 'closed', now = ph[0] === 'open', same = shown && Math.abs(ph[1] - shown) < 1000;
  const tiles = [...(open ? [{ icon: 'external', label: 'Attendance page', href: url, blank: true }] : []), { icon: 'eye', label: 'View This Event', href: to(page + '/live') },
    { icon: 'users', label: 'Attendees', href: to(page + '/attendance') },
    ...(can ? [{ icon: 'sliders', label: 'Attendance settings', attrs: { 'data-act': 'ev_att_set', 'data-c': c, 'data-id': e.id } }] : [])];
  return <div className="ev_att">
    <div className="ev_att_side"><a href={to(page + '/attendance')} className="ev_count" data-tip={n > 99 ? `${n} attended` : undefined}><b>{n > 99 ? '99+' : n}</b> attended</a>
      {open ? <span className="ev_left">{ph[0] === 'soon' ? 'Opens in' : 'Closes in'} <b data-count-to={ph[1]}>{left(ph[1] - Date.now())}</b></span> : null}
      {open ? <button type="button" className="btn btn_outline btn_sm" data-act="copy" data-text={url} data-what="Link">{ic('copy', 'h-4 w-4')}Copy link</button>
        : <a href={to(page + '/attendance')} className="btn btn_outline btn_sm">{ic('users', 'h-4 w-4')}Attendance</a>}
      {tile_menu({ id: `pop_links_${e.id}`, title: e.title, icon: false, label: 'Open', tiles })}</div>
  </div>;
}
