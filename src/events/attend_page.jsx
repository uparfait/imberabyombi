/* events/attend_page.jsx: the attendance page its QR code opens (/attend/<events|activities>/<id>): no header or sidebar,
   on a soft tint from its title (.tint), just the title of the event or activity (up to three lines, then "…"; whole on hover), and the form (attend_form.jsx) while attendance is open (att_window.js),
   with the time left until it closes; before that, the time left until it opens; after, closed. A
   page that shows a count follows new sign-ins from other tabs at once (the storage listener below). */
import { db, rerender, after_render, TIMERS } from '../store/index.js';
import { empty } from '../ui/index.js';
import { set_meta } from '../router/parse.js';
import { att_phase } from './att_window.js';
import { left, tick } from './countdown.js';
import { Attend_form, Tick } from './attend_form.jsx';

addEventListener('storage', e => { if (e.key?.endsWith('c:attendees')) rerender(); });

export function attend_page(r) {
  const [, , c, id] = r.path.split('/'), e = ['events', 'activities'].includes(c) ? db.find(c, id) : null, ph = e ? att_phase(e) : ['closed'];
  after_render(() => TIMERS.push(setInterval(tick, 1000)));
  const clock = (label, t) => <p className="att_clock">{label} <b data-count-to={t}>{left(t - Date.now())}</b></p>;
  set_meta(e ? `Attendance · ${e.title}` : 'Attendance');
  return <main id="main" className="att_page"><div className="att_card card">
    {!e ? empty('Not found', 'This link does not lead to an event or activity.', null, 'alert', 'warn')
      : <><h1 className="att_title line-clamp-3">{e.title}</h1>
        {ph[0] === 'soon' ? <div className="att_done">{clock('Attendance opens in', ph[1])}</div>
          : ph[0] === 'open' ? <>{clock('Closes in', ph[1])}<Attend_form c={c} id={id} /></>
          : <Tick text="Attendance is closed" sub={e.status === 'Cancelled' ? 'It was cancelled.' : ''} />}</>}
  </div></main>;
}
