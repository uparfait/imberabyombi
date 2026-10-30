/* events/live_page.jsx: Open This Event, the live screen of an event or activity (/admin/events/<id>/live, …/live): the
   whole window, no sidebar, to show while it runs. Its title in the top bar (cut with "…" when long, whole on hover);
   then its description and times, the agenda item running now (its title, then its description apart, its presenter,
   its time left and how far it has got; full screen: track_full.jsx), the
   agenda and the organisers as tables (ev_tables.jsx: Edit, Add and Transfer for those who manage it, not once it is
   over). On the right the time left, then the attendance QR code, large (a click shows it on the whole screen), or its
   empty place (not open yet; "Finished" once over), with the live count and the link. Menu (tiles): Record/View
   minutes, Add task (Follow-ups), Attendees, Full screen. Redrawn every 30 seconds; the count follows new ones at once. */
import { tz_parts, page_tz, fmt_time, fmt_d, zone_short } from '../lib/index.js';
import { db, route, rerender, after_render, TIMERS } from '../store/index.js';
import { auth } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { empty } from '../ui/index.js';
import { to } from '../router/index.js';
import { copy_box } from '../overlays/index.js';
import { tile_menu } from '../admin/tile_menu.jsx';
import { ev_state } from './ev_state.js';
import { agenda_now } from './agenda_now.js';
import { count_to, left, tick } from './countdown.js';
import { att_count, att_url, BASE } from './attend_side.jsx';
import { att_phase } from './att_window.js';
import { Qr } from './qr.jsx';
import { qr_full } from './qr_full.jsx';
import { agenda_table, org_table, add_co } from './ev_tables.jsx';
import { track_full, item_end, hue } from './track_full.jsx';

const mins = t => { const [h, m] = String(t || '0:0').split(':').map(Number); return h * 60 + m; };
const span = a => `${fmt_time(a.from)} – ${fmt_time(a.to)}`;
const who = a => a?.p_name ? <p className="live_who truncate">{a.p_name}{a.p_title ? `, ${a.p_title}` : ''}</p> : null;

export function live_page(id, c) {
  const e = db.find(c, id), page = `${BASE[c]}/${id}`;
  if (!e) return empty('Not found', 'It may have been deleted.', null, 'alert', 'warn');
  route.title = e.title; route.full = true;
  after_render(() => TIMERS.push(setInterval(tick, 1000), setInterval(rerender, 30000)));
  const st = ev_state(e), t = count_to(e, st), ag = e.agenda || [], now_i = agenda_now(e), p = tz_parts(e.tz || page_tz(), Date.now());
  const now_m = p.h * 60 + p.mi, it = ag[now_i], next = ag.find(a => mins(a.from) > now_m), n = att_count(id), ph = att_phase(e)[0], open = ph === 'open';
  const done = it ? Math.min(100, Math.max(0, (now_m - mins(it.from)) / Math.max(1, mins(it.to) - mins(it.from)) * 100)) : 0;
  const can = auth.can(c === 'events' ? 'events' : 'calendar', 2) && st !== 'Past';
  const head = (title, sec) => <div className="live_head"><h2>{title}</h2>
    {can ? <button type="button" className="ev_edit" data-act="ev_edit" data-col={c} data-id={id} data-sec={sec} aria-label={`Edit ${title.toLowerCase()}`}>{ic('edit', 'h-3.5 w-3.5')}Edit</button> : null}</div>;
  return <div className="live">
    <header className="live_top"><a href={to(page)} className="icon_btn" aria-label="Back" data-tip="Back">{ic('chev_l')}</a>
      <h1 className="live_title truncate">{e.title}</h1>
      <div className="live_acts">{tile_menu({ id: `pop_live_${id}`, title: e.title, icon: 'grid', label: 'Menu', tiles: [
        { icon: 'note', label: 'Record/View minutes', attrs: { 'data-act': 'ev_minutes', 'data-c': c, 'data-id': id } }, { icon: 'tasks', label: 'Add task (Follow-ups)', attrs: { 'data-act': 'ev_follow', 'data-c': c, 'data-id': id } },
        { icon: 'users', label: 'Attendees', attrs: { 'data-act': 'ev_att_list', 'data-c': c, 'data-id': id } }, { icon: 'fullscreen', label: 'Full screen', attrs: { 'data-act': 'live_full' } }] })}</div></header>
    <div className="live_body"><section className="live_main">
      <div className="card live_card">{head('Details', 'Details')}{e.about || e.note ? <p className="live_about">{e.about || e.note}</p> : null}
        <p className="live_when_all">{[e.tbd ? '' : fmt_d(e.date), e.start ? `${fmt_time(e.start)}${e.end ? ` – ${fmt_time(e.end)}` : ''}` : '', zone_short(e.tz || page_tz(), e.date)].filter(Boolean).join(' · ')}</p></div>
      {ag.length ? <div className="card live_now tint" style={{ '--h': hue((it || next)?.title) }}><div className="live_head"><p className="att_kind">{it ? `Now · ${span(it)}` : next ? `Next · ${span(next)}` : 'Agenda'}</p>
        <button type="button" className="icon_btn h-8 w-8" data-act="ev_track" data-id={id} aria-label="The agenda on the whole screen" data-tip="Full screen">{ic('expand', 'h-4 w-4')}</button></div>
        {(x => x ? <><h2 className="live_now_t line-clamp-2">{x.title}</h2>{x.desc ? <p className="live_now_d line-clamp-2">{x.desc}</p> : null}{who(x)}</> : <h2 className="live_now_t">Done</h2>)(it || next)}
        {it ? <><p className="live_item_left"><b data-count-to={item_end(e, it)}>{left(item_end(e, it) - Date.now())}</b> left</p>
          <progress max="100" value={done} aria-label="How far it has got"></progress></> : null}</div> : null}
      <div className="card live_card">{head('Agenda', 'Agenda')}{agenda_table(e, true)}</div>
      <div className="card live_card"><div className="live_head"><h2>Organisers</h2>{can ? add_co(e, c) : null}</div>{org_table(e, c, can)}</div>
    </section>
    <aside className="card live_qr">{t ? <p className="live_left">{t[0]}<b data-count-to={t[1]}>{left(t[1] - Date.now())}</b></p> : null}{open ? <button type="button" className="live_qr_btn" data-act="ev_qr" data-id={id} aria-label="Show the QR code on the whole screen" data-tip="Full screen">
      <Qr text={att_url(c, id)} label="Attendance QR code" /></button> : <div className="qr_empty">{ph === 'closed' ? 'Finished' : ''}</div>}
      <p className="qr_full_count"><b>{n}</b> attended</p>{open ? copy_box(att_url(c, id), 'Link') : null}</aside></div>
    {open ? qr_full(e, att_url(c, id), n) : null}
  </div>;
}

/* the browser's own full screen for the live screen (Esc leaves it) */
export const LIVE_ACT = { live_full: () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.().catch(() => {}) };
