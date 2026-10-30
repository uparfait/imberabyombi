/* events/attend_side.jsx: attendance under an event's status, compact so the card needs no scrolling: a small QR code
   while it is upcoming, live or recurring (a click shows it on the whole screen: qr_full.jsx), and beside it how many
   attended (live; past 99 it shows 99+; it opens their table), Copy link, and Open: the event's other pages as tiles (the system's tile menu).
   att_count() and the paths are shared with the live screen. */
import { db } from '../store/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { Qr } from './qr.jsx';
import { tile_menu } from '../admin/tile_menu.jsx';
import { qr_full } from './qr_full.jsx';

export const BASE = { events: '/admin/events', activities: '/admin/calendar' };
export const att_count = id => db.list('attendees').filter(a => a.ref === id).length;
export const att_url = (c, id) => new URL(to(`/attend/${c}/${id}`), location.origin).href;
export const qr_open = st => ['Upcoming', 'Live', 'Recurring'].includes(st);

export function attend_side(e, c, st) {
  const url = att_url(c, e.id), n = att_count(e.id), page = `${BASE[c]}/${e.id}`, open = qr_open(st);
  const tiles = [{ icon: 'external', label: 'Attendance page', href: url }, { icon: 'play', label: 'Live screen', href: to(page + '/live') },
    { icon: 'users', label: 'Attendees', href: to(page + '/attendance') }];
  return <div className={`ev_att ${open ? '' : 'ev_att_one'}`}>
    {open ? <button type="button" className="ev_qr_btn" data-act="ev_qr" data-id={e.id} aria-label="Show the QR code on the whole screen" data-tip="Full screen">
      <Qr text={url} label="Attendance QR code" /></button> : null}{open ? qr_full(e, url, n) : null}
      {open ? <button type="button" className="btn btn_outline btn_sm" data-act="copy" data-text={url} data-what="Link">{ic('copy', 'h-4 w-4')}Copy link</button> : null}
      <div className="relative"><button type="button" className="btn btn_outline btn_sm w-full justify-between" data-act="pop" data-pop={`pop_links_${e.id}`} aria-haspopup="menu">
        Open{ic('chev_u', 'h-4 w-4')}</button>
        <div id={`pop_links_${e.id}`} className="pop bottom-full right-0 mb-2 w-56" role="menu" hidden>{links.map(([l, i, href, out]) =>
          <a key={l} href={href} className="menu_item" role="menuitem" target={out ? '_blank' : undefined} rel={out ? 'noreferrer' : undefined}>{ic(i, 'h-4 w-4 text-muted')}{l}</a>)}</div></div></div>
  </div>;
}
