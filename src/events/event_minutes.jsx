/* events/event_minutes.jsx: an event's or activity's minutes and follow-ups, from the Menu of Open This Event
   (live_page.jsx). Record/View minutes opens the document editor on that day's own document ("Minutes · <title> ·
   <date>"), started with who attended and the agenda (a recurring one gets one per day); the minutes live there. Add
   task (Follow-ups) opens the task form, linked by ref; follow-ups live in Tasks. MINUTES_ACT: those two tiles. */
import { esc, fmt_d, fmt_time, pad, tz_parts, page_tz } from '../lib/index.js';
import { db } from '../store/index.js';
import { me } from '../auth/index.js';
import { go } from '../router/index.js';
import { open_form } from '../table/index.js';

const today_in = e => { const p = tz_parts(e.tz || page_tz(), Date.now()); return `${p.y}-${pad(p.mo)}-${pad(p.d)}`; };
/* the first page: title, when and where, who attended (that day, for a series), the agenda, decisions and actions */
function first_page(e, day) {
  const came = db.list('attendees').filter(a => a.ref === e.id && (!e.repeat || String(a.at).slice(0, 10) === day))
    .map(a => `<li>${esc(a.name)}${a.org ? ` (${esc(a.org)})` : ''}</li>`).join('');
  const ag = (e.agenda || []).map(a => `<h3>${esc(a.title)}</h3><p>${esc([a.p_name, a.p_title].filter(Boolean).join(', '))}</p><p><br></p>`).join('');
  return `<h1>${esc(e.title)}</h1><p>${[fmt_d(day), e.start ? fmt_time(e.start) : '', e.venue ? esc(e.venue) : ''].filter(Boolean).join(' · ')}</p>`
    + `<h2>Present</h2>${came ? `<ul>${came}</ul>` : '<p><br></p>'}${ag ? `<h2>Agenda</h2>${ag}` : ''}<h2>Decisions</h2><p><br></p><h2>Actions</h2><p><br></p>`;
}

export const MINUTES_ACT = {
  ev_minutes: async t => { const c = t.dataset.c, e = db.find(c, t.dataset.id); if (!e) return; const day = today_in(e);
    let m = db.list('minutes').find(x => x.ref === e.id && x.date === day);
    if (!m) m = db.find('minutes', db.upsert('minutes', { ref: e.id, c, date: day, title: `Minutes · ${e.title} · ${fmt_d(day)}`, by: me(), at: Date.now() }));
    const key = 'editor_doc:m_' + m.id, { idb_get, idb_set } = await import('../editor/core/idb.js');
    if (!(await idb_get(key))) await idb_set(key, { title: m.title, tabs: [{ id: 't1', name: 'Minutes', html: first_page(e, day) }], active: 't1', comments: [] });
    go('/admin/docs?doc=m_' + m.id); },
  ev_follow: t => { const e = db.find(t.dataset.c, t.dataset.id); if (e) open_form('tasks', null, { title: `Follow-up: ${e.title}`, ref: e.id }); }
};

