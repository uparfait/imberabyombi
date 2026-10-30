/* events/event_minutes.jsx: an event's or activity's minutes and follow-ups, two cards on its page. Minutes: Record
   minutes opens the document editor on that day's own document ("Minutes · <title> · <date>"), started with who attended
   and the agenda; each day's minutes are listed by date with who wrote them, to open or share (a recurring one gathers
   one per day). Follow-ups: tasks made from it (the task form, linked by ref), with who does them and their status.
   MINUTES_ACT: their buttons. */
import { esc, fmt_d, fmt_time, pad, tz_parts, page_tz } from '../lib/index.js';
import { db } from '../store/index.js';
import { me } from '../auth/index.js';
import { ic } from '../icons/index.js';
import { badge } from '../ui/index.js';
import { to, go } from '../router/index.js';
import { open_form } from '../table/index.js';

const doc_url = m => new URL(to('/admin/docs?doc=m_' + m.id), location.origin).href;
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

const card = (title, btn, list) => <section className="card ev_card"><header className="ev_card_head"><h3>{title}</h3>{btn}</header>
  {list.length ? <ul className="ev_list">{list}</ul> : <p className="text-sm text-muted">None yet</p>}</section>;

export const minutes_card = (e, c, can) => card('Minutes', can ? <button type="button" className="btn btn_outline btn_sm" data-act="ev_minutes" data-c={c} data-id={e.id}>
  {ic('edit', 'h-4 w-4')}Record minutes</button> : null, db.list('minutes').filter(m => m.ref === e.id).sort((a, b) => b.date.localeCompare(a.date)).map(m => <li key={m.id}>
  <a href={to('/admin/docs?doc=m_' + m.id)} className="ev_list_main"><b>{fmt_d(m.date)}</b><span className="text-sm text-muted">{m.by}</span></a>
  <button type="button" className="icon_btn h-8 w-8" data-act="copy" data-text={doc_url(m)} data-what="Link" aria-label="Copy the link" data-tip="Copy link">{ic('link', 'h-4 w-4')}</button></li>));

export const follow_card = (e, c, can) => card('Follow-ups', can ? <button type="button" className="btn btn_outline btn_sm" data-act="ev_follow" data-c={c} data-id={e.id}>
  {ic('plus', 'h-4 w-4')}Add task</button> : null, db.list('tasks').filter(x => x.ref === e.id).map(x => <li key={x.id}>
  <button type="button" className="ev_list_main" data-act="task_open" data-id={x.id}><b className="truncate">{x.title}</b><span className="text-sm text-muted">{x.assignee}</span></button>
  {badge(x.status)}</li>));
