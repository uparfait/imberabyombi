/* events/attendees_view.jsx: who attended an event or activity, in an overlay (the #viewer dialog) over the page that asks
   (its page, Open This Event): no page of its own. The usual table, so it searches, sorts, pages and exports (CSV, JSON,
   Excel; no filters); a row shows the person and their signature. Only what people submit: no Add, Edit or Delete. It
   follows new ones at once (the storage listener in attend_page.jsx). ATTENDEES_ACT.ev_att_list (data-c, data-id) opens it. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { ic } from '../icons/index.js';
import { show_in_dialog } from '../overlays/index.js';
import { crud } from '../table/index.js';

function view(c, id) {
  const e = db.find(c, id); if (!e) return null;
  return <><header className="flex items-center gap-2 py-2 pl-4 pr-2"><h2 className="min-w-0 flex-1 truncate font-sans text-base font-medium">{e.title}</h2>
    <button type="button" className="icon_btn" data-act="close_viewer" aria-label="Close">{ic('x')}</button></header>
    <div className="att_list min-h-0 flex-1 overflow-auto">{crud('attendees', { title: 'Attended', mod: c === 'events' ? 'events' : 'calendar', filter: a => a.ref === id, preset: { ref: id, c }, can_row: () => false, add: false, full: false })}</div></>;
}

export const ATTENDEES_ACT = {
  ev_att_list: t => { const { c, id } = t.dataset, d = qs('#viewer');
