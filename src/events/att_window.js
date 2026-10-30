/* events/att_window.js: when attendance is open for an event or activity: from att_before minutes before it starts to
   att_after minutes after it ends (15 and 15 unless set in Attendance settings), on its day (a recurring one: today's
   or its next day). att_phase(e) is ['soon', opens], ['open', closes] or ['closed']; no date yet or cancelled: closed. */
import { pad, tz_parts, page_tz, repeat_next, ymd, add_d, parse_d } from '../lib/index.js';
import { at } from '../schemas/index.js';
