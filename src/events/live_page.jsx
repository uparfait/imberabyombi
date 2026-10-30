/* events/live_page.jsx: the live screen of an event or activity (/admin/events/<id>/live, /admin/calendar/<id>/live): the
   whole window, no sidebar, to show while it runs. The agenda item running now, large, with its presenter and how far it
   has got; the agenda (done, now, next); the attendance QR code, large, with the live count and the link. Its Menu (the
   system's tile menu): Record minutes, Add task, Attendees, Full screen. Redrawn every 30 seconds; the count follows new
   sign-ins at once. */
import { pad, tz_parts, page_tz, fmt_time } from '../lib/index.js';
import { db, route, rerender, after_render, TIMERS } from '../store/index.js';
import { ic } from '../icons/index.js';
import { badge, empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { ev_state } from './ev_state.js';
import { agenda_now } from './agenda_now.js';
import { count_to, left, tick } from './countdown.js';
import { att_count, att_url, BASE } from './attend_side.jsx';
import { att_phase } from './att_window.js';
import { Qr } from './qr.jsx';
import { tile_menu } from '../admin/tile_menu.jsx';

const mins = t => { const [h, m] = String(t || '0:0').split(':').map(Number); return h * 60 + m; };
const span = a => `${fmt_time(a.from)} – ${fmt_time(a.to)}`;

export function live_page(id, c) {
  const e = db.find(c, id), page = `${BASE[c]}/${id}`;
  if (!e) return empty('Not found', 'It may have been deleted.', null, 'alert', 'warn');
  route.title = `Live · ${e.title}`; route.full = true;
  after_render(() => TIMERS.push(setInterval(tick, 1000), setInterval(rerender, 30000)));
  const st = ev_state(e), t = count_to(e, st), ag = e.agenda || [], now_i = agenda_now(e), p = tz_parts(e.tz || page_tz(), Date.now());
  const now_m = p.h * 60 + p.mi, it = ag[now_i], next = ag.find(a => mins(a.from) > now_m), n = att_count(id), open = att_phase(e)[0] !== 'closed';
  const done = it ? Math.min(100, Math.max(0, (now_m - mins(it.from)) / Math.max(1, mins(it.to) - mins(it.from)) * 100)) : 0;
  return <div className="live">
    <header className="live_top"><a href={to(page)} className="icon_btn" aria-label="Back" data-tip="Back">{ic('chev_l')}</a>
      <h1 className="live_title truncate">{e.title}</h1>{badge(st)}
      {t ? <span className="ev_left">{t[0]} <b data-count-to={t[1]}>{left(t[1] - Date.now())}</b></span> : null}
      <div className="live_acts">{tile_menu({ id: `pop_live_${id}`, title: e.title, icon: false, label: 'Menu', tiles: [
        { icon: 'edit', label: 'Record minutes', attrs: { 'data-act': 'ev_minutes', 'data-c': c, 'data-id': id } }, { icon: 'tasks', label: 'Add task', attrs: { 'data-act': 'ev_follow', 'data-c': c, 'data-id': id } },
        { icon: 'users', label: 'Attendees', href: to(page + '/attendance') }, { icon: 'fullscreen', label: 'Full screen', attrs: { 'data-act': 'live_full' } }] })}</div></header>
    <div className="live_body"><section className="live_main">
      <div className="card live_now">{it ? <><p className="att_kind">Now · {span(it)}</p><h2 className="live_now_t">{it.title}</h2>
