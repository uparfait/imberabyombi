/* events/attend_page.jsx: the attendance page its QR code opens (/attend/<events|activities>/<id>): no header or sidebar,
   just the event or activity, when and where, and the form (attend_form.jsx) while attendance is open (att_window.js),
   with the time left until it closes; before that, the time left until it opens; after, closed. A
   page that shows a count follows new sign-ins from other tabs at once (the storage listener below). */
import { fmt_d, fmt_time } from '../lib/index.js';
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
  const where = e && (e.place === 'Virtual' ? 'Online' : e.venue);
  return <main id="main" className="att_page"><div className="att_card card">
    {!e ? empty('Not found', 'This link does not lead to an event or activity.', null, 'alert', 'warn')
      : <><p className="att_kind">{c === 'events' ? 'Event' : 'Activity'}</p><h1 className="att_title">{e.title}</h1>
        <p className="att_when">{[e.tbd ? '' : fmt_d(e.date), e.start ? fmt_time(e.start) : '', where].filter(Boolean).join(' · ')}</p>
        {st === 'Past' || st === 'Cancelled' ? <Tick text="Attendance is closed" sub={st === 'Cancelled' ? 'It was cancelled.' : 'It is over.'} />
          : <Attend_form c={c} id={id} />}</>}
  </div></main>;
}
