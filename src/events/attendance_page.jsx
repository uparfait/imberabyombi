/* events/attendance_page.jsx: everyone who attended one event or activity (/admin/events/<id>/attendance,
   /admin/calendar/<id>/attendance): the usual table, so it searches, sorts, pages and exports (CSV, JSON, Excel); a row
   shows the person and their signature. Someone can be added by hand. */
import { db, route } from '../store/index.js';
import { ic } from '../icons/index.js';
