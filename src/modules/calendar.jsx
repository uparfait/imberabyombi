/* modules/calendar.jsx: VIEWS.calendar (a week or month grid with a header to move around and add an activity, then the
   Activities table) and cal_go(), which moves the calendar to a date with a slide. */
import { VIEWS } from './views.js';
import { ui, route, rerender, after_render } from '../store/index.js';
import { event_page } from '../events/index.js';
import { auth } from '../auth/index.js';
import { parse_d, add_d, ymd, cap, qs, rem } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { crud } from '../table/index.js';
import { cal_items } from '../admin/index.js';
import { week_grid, month_grid } from './calendar_grids.jsx';

/* Week / Month: a segmented choice (the change listener sets ui.cal_view) */
const views = wk => <div className="seg" role="radiogroup" aria-label="Calendar view">{['week', 'month'].map(v => <label key={v}>
  <input type="radio" className="sr-only" name="calv" value={v} data-calview="" defaultChecked={ui.cal_view === v || (v === 'week' && wk && ui.cal_view !== 'month')} />
  <span>{cap(v)}</span></label>)}</div>;

VIEWS.calendar = () => {
  const d = parse_d(ui.cal_date), wk = ui.cal_view !== 'month', items = cal_items(), can = auth.can('calendar', 2);
  after_render(() => { const s = qs('#date_hours'); if (s) s.scrollTop = 7 * 3 * rem(); });
  const grid = wk ? week_grid(d, items) : month_grid(d, items);
  return <>
    <section className="card overflow-hidden"><header className="flex flex-wrap items-center gap-2 border-b border-line p-3 sm:p-4">
      <button className="btn btn_outline" data-act="cal_today">Today</button>
      <button className="icon_btn" data-act="cal_nav" data-n="-1" aria-label="Previous">{ic('chev_l')}</button>
      <button className="icon_btn" data-act="cal_nav" data-n="1" aria-label="Next">{ic('chev_r')}</button>
      <h2 className="date_title font-sans text-xl font-normal sm:text-2xl">{d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
      <div className="ml-auto flex items-center gap-2">{views(wk)}
        {can ? <button className="btn btn_primary" data-act="add" data-col="activities">{ic('plus', 'h-4 w-4')}
          <span className="hidden sm:inline">Activity</span></button> : null}</div>
    </header><div className="date_body">{grid}</div></section>
    {auth.can('calendar') ? <div className="mt-6">{crud('activities', { title: 'Activities', mod: 'calendar' })}</div> : null}
  </>;
};

/* Move the main calendar to a date. When the shown week/month changes, its title and grid slide in from that
   direction; when the month changes, the sidebar mini calendar slides too (played after the render). */
export function cal_go(k) {
  const old = ui.cal_date, shown = s => { const d = parse_d(s); return ui.cal_view === 'month' ? s.slice(0, 7) : ymd(add_d(d, -d.getDay())); };
  const moved = shown(k) !== shown(old), month = k.slice(0, 7) !== (ui.mini || old).slice(0, 7), n = Math.sign(parse_d(k) - parse_d(old)) || 1;
  ui.cal_date = k; ui.mini = null;
  const sel = [moved && '.date_title, .date_body', month && '#date_mini .date_mini_title, #date_mini .date_mini_grid'].filter(Boolean).join(', ');
  ui.slide = moved || month ? { n, sel } : null;
  rerender();
}
