/* modules/calendar.jsx: VIEWS.calendar (a week or month grid with a header to move around and add an activity, then the
   Activities table) and cal_go(), which moves the calendar to a date with a slide. */
import { VIEWS } from './views.js';
import { ui, rerender, after_render } from '../store/index.js';
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
