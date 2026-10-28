/* lib/dates.js: TINY UTILITIES for dates and times: local yyyy-mm-dd / hh:mm strings, day maths, display formats,
   the 24-hour / 12-hour clock setting and ISO weeks. */
import { pad } from './text.js';
/* db straight from its file (not the store barrel): the barrel also loads app_state, which needs these helpers first */
