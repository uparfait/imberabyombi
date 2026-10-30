/* events/attend_side.jsx: attendance under an event's status, compact so the card needs no scrolling: "Opens in" or
   "Closes in" (att_window.js), whole, unless the status already counts to that moment (shown), then a small QR code while attendance is open (a click shows it on the whole screen:
   qr_full.jsx; before, its place stays empty; once over, "Finished"), and beside it how many attended (live; past 99 it
   shows 99+; it opens their table, an overlay: attendees_view.jsx), Copy link (once over: Attendance, their table), and
   Open: the event's other pages as tiles (the system's tile menu).
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
  const tiles = [...(open ? [{ icon: 'external', label: 'Attendance page', href: url, blank: true }] : []), { icon: 'eye', label: 'Open This Event', href: to(page + '/live') },
    { icon: 'users', label: 'Attendees', attrs: { 'data-act': 'ev_att_list', 'data-c': c, 'data-id': e.id } },
    ...(can ? [{ icon: 'sliders', label: 'Attendance settings', attrs: { 'data-act': 'ev_att_set', 'data-c': c, 'data-id': e.id } }] : [])];
  return <div className="ev_att">
    {open && !same ? <span className="ev_left ev_att_left">{now ? 'Closes in' : 'Opens in'} <b data-count-to={ph[1]}>{left(ph[1] - Date.now())}</b></span> : null}
    {!now ? <div className="qr_empty">{open ? '' : 'Finished'}</div> : null}
    {now ? <button type="button" className="ev_qr_btn" data-act="ev_qr" data-id={e.id} aria-label="Show the QR code on the whole screen" data-tip="Full screen">
      <Qr text={url} label="Attendance QR code" /></button> : null}{now ? qr_full(e, url, n) : null}
    <div className="ev_att_side"><button type="button" className="ev_count" data-act="ev_att_list" data-c={c} data-id={e.id} data-tip={n > 99 ? `${n} attended` : undefined}><b>{n > 99 ? '99+' : n}</b> attended</button>
      {open ? <button type="button" className="btn btn_outline btn_sm" data-act="copy" data-text={url} data-what="Link">{ic('copy', 'h-4 w-4')}Copy link</button>
        : <a href={to(page + '/attendance')} className="btn btn_outline btn_sm">{ic('users', 'h-4 w-4')}Attendance</a>}
      {tile_menu({ id: `pop_links_${e.id}`, title: e.title, icon: false, label: 'Open', tiles })}</div>
  </div>;
}
