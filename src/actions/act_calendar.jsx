/* actions/act_calendar.jsx: data-act handlers of the calendar: today, previous / next week or month, the sidebar mini
   calendar (pages and slides in place), a day, an empty hour slot (new activity), an activity or an event (its page). */
import { qs, ymd, pad, add_d, parse_d, fmt_d } from '../lib/index.js';
import { ui, db, route, rerender } from '../store/index.js';
import { auth } from '../auth/index.js';
import { modal, slide_in } from '../overlays/index.js';
import { open_form } from '../table/index.js';
import { cal_go } from '../modules/index.js';
import { mini_draw } from '../admin/index.js';
import { go } from '../router/index.js';

export const CALENDAR_ACT = {
  cal_today: () => cal_go(ymd()),
  cal_nav: t => { const d = parse_d(ui.cal_date), n = +t.dataset.n; cal_go(ymd(ui.cal_view === 'month' ? new Date(d.getFullYear(), d.getMonth() + n, 1) : add_d(d, 7 * n))); },
  /* Sidebar mini calendar pages in place and slides (no page re-render: mini_draw() redraws only #date_mini's content) */
  mini: t => { const n = +t.dataset.n, b = parse_d(ui.mini || ui.cal_date); ui.mini = ymd(new Date(b.getFullYear(), b.getMonth() + n, 1));
    const box = qs('#date_mini'); if (!box || !mini_draw()) return rerender(); slide_in(box.querySelectorAll('.date_mini_title, .date_mini_grid'), n); },
  goday: t => { if (route.mod === 'calendar') return cal_go(t.dataset.d); ui.cal_date = t.dataset.d; ui.mini = null; go('/admin/calendar'); },
  slot: (t, e) => { if (!auth.can('calendar', 2)) return; let h = 9; if (t.classList.contains('hour_lines')) { const r = t.getBoundingClientRect(); h = Math.min(22, Math.max(0, Math.floor((e.clientY - r.top) / r.height * 24))); }
    open_form('activities', null, { date: t.dataset.d, start: `${pad(h)}:00`, end: `${pad(h + 1)}:00` }); },
  ev: t => { const c = t.dataset.c; if (c === 'events' && auth.can('events')) return go('/admin/events/' + t.dataset.id);   /* its page */
    else { const r = db.find(c, t.dataset.id); modal({ title: r?.title || 'Event', body: <p className="text-muted sm:col-span-2">{`${fmt_d(r?.date)}, ${r?.start || ''}`}</p> }); } }
};
