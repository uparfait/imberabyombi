/* modules/calendar_grids.jsx: the calendar's two grids. Week: day heads, an all-day row for your tasks, then 24 hours
   (3rem each) with timed chips and the red now-line. Month: 6 weeks of day cells with up to 3 items each. */
import { add_d, ymd, to_min, fmt_hour, zone_of, page_tz, page_now } from '../lib/index.js';
import { cal_task } from '../admin/index.js';
