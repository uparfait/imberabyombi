/* events/track_full.jsx: the agenda on the whole screen (the browser's own full screen; Esc or × closes it), from the
   "now" card of Open This Event: one item at a time, in the middle: its time, its title, then its description (smaller,
   apart), its presenter and, while it runs, the time it has left; the event's title on top, its time left bottom right. Back and
   Next (the arrow keys, the dots) step through the items; on its own it slides to the item running now (else the next):
   the page redraws every 30 seconds and when a countdown ends, and a picked item holds until the running one changes or
   two minutes pass. The text starts at the left, the block in the middle. The background is a soft tint from the
   item's title (hue(): the same title, the same colour; .tint), mixed into the page colour so it stays calm in both
   themes; the now card has it too. item_end(e, a): when an item ends (ms). TRACK_ACT: its buttons. */
import { qs, pad, tz_parts, page_tz, fmt_time } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { at } from '../schemas/index.js';
import { ic } from '../icons/index.js';
import { left } from './countdown.js';

const today = e => { const p = tz_parts(e.tz || page_tz(), Date.now()); return [`${p.y}-${pad(p.mo)}-${pad(p.d)}`, `${pad(p.h)}:${pad(p.mi)}`]; };
export const item_end = (e, a) => at(e.repeat ? today(e)[0] : e.date, a.to, e.tz);
export const hue = s => [...String(s || '')].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7) % 360;
let pick = null;   /* { id, i, now, at }: the item picked with Back / Next */

/* each item: Now, Done or Next; the slide shown: the one picked, else the one running now, else the next, else the last */
function track_at(e, now) {
  const [d, hm] = today(e), day = e.repeat ? d : e.date, ag = e.agenda || [];
  const st = ag.map((a, i) => i === now ? 'Now' : day < d || (day === d && a.to <= hm) ? 'Done' : 'Next'), next = st.indexOf('Next');
  const held = pick?.id === e.id && pick.now === now && Date.now() - pick.at < 120e3;
  return [st, held ? Math.min(pick.i, ag.length - 1) : now > -1 ? now : next > -1 ? next : ag.length - 1];
}
const left_of = ms => <b data-count-to={ms}>{left(ms - Date.now())}</b>;

export function track_full(e, now, t) {
  const [st, cur] = track_at(e, now), ag = e.agenda, go = { 'data-act': 'track_go', 'data-id': e.id, 'data-now': now };
  const step = (d, l, i) => <button type="button" className="icon_btn track_step" {...go} data-i={cur + d} disabled={cur + d < 0 || cur + d >= ag.length} aria-label={l} data-tip={l}>{ic(i)}</button>;
  return <div id={`track_${e.id}`} className="track_full tint" hidden role="dialog" aria-label="Agenda" style={{ '--h': hue(ag[cur]?.title) }}>
    <header className="track_top"><p className="track_ev truncate">{e.title}</p>
      <button type="button" className="icon_btn" data-act="qr_close" aria-label="Close" data-tip="Close (Esc)">{ic('x')}</button></header>
    <div className="track_view">{step(-1, 'Back', 'chev_l')}<div className="track_clip"><ol className="track_strip" style={{ transform: `translateX(${-cur * 100}%)` }}>{ag.map((a, i) =>
      <li key={i} className="track_slide" aria-current={i === cur ? 'step' : undefined} aria-hidden={i !== cur}>
        <p className="att_kind">{st[i]} · {fmt_time(a.from)} – {fmt_time(a.to)}</p><h2 className="track_t line-clamp-3">{a.title}</h2>
        {a.desc ? <p className="track_d line-clamp-3">{a.desc}</p> : null}{a.p_name ? <p className="track_who truncate">{a.p_name}{a.p_title ? `, ${a.p_title}` : ''}</p> : null}
        {i === now ? <p className="track_item_left">{left_of(item_end(e, a))} left</p> : null}</li>)}</ol></div>{step(1, 'Next', 'chev_r')}</div>
    <footer className="track_foot"><span></span><p className="track_dots">{ag.map((a, i) => <button key={i} type="button" {...go} data-i={i} className={i === cur ? 'on' : st[i] === 'Done' ? 'done' : ''} aria-label={`Item ${i + 1}: ${a.title}`}></button>)}</p>
      {t ? <p className="track_left"><span>{t[0]}</span>{left_of(t[1])}</p> : <span></span>}</footer></div>;
}

/* the arrow keys while it is open: Back and Next */
addEventListener('keydown', k => { const f = qs('.track_full:not([hidden])'), b = f && { ArrowLeft: 0, ArrowRight: 1 }[k.key];
  if (b == null) return; k.preventDefault(); const s = f.querySelectorAll('.track_step')[b]; if (!s.disabled) s.click(); });
