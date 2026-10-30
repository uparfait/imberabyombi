/* tzconv/tz_page.jsx: the time zone converter (/admin/tz): a date and time in one time zone (From: zone, date, hour and
   minute, 12h / 24h, Now) and the same moment in another (To: zone, 12h / 24h; the time large, its date, the offset, the
   difference and "Next day" / "Previous day"); Swap turns them around. Zones and maths: lib/tz.js; the zone fields are
   selects, so the template's picker searches them. */
import { useState } from 'react';
import './tz_styles.css';
