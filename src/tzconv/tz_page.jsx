/* tzconv/tz_page.jsx: TZ PlayGround (Timezone PlayGround, /admin/tz), the time zone converter: a date and time in one time zone (From: zone, date, hour and
   minute, 12h / 24h, Now) and the same moment in another (To: zone, 12h / 24h; the time large, its date, the offset, the
   difference and "Next day" / "Previous day"); Swap turns them around. Zones and maths: lib/tz.js; the zone fields are
   selects, so the template's picker searches them. */
import { useState } from 'react';
import './tz_styles.css';
import { pad, page_tz, h24, tz_parts, offset_min, zoned_to_utc, gmt, zone_list } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { page_title } from '../ui/index.js';
import { dt_attrs } from '../fields/index.js';

const ymd_of = p => `${p.y}-${pad(p.mo)}-${pad(p.d)}`;
/* the start: now, in the page's time zone, converted to UTC (or to London when the page is on UTC) */
function first() {
  const from = page_tz(), p = tz_parts(from, Date.now()), f = h24() ? '24' : '12';
  return { from, to: from === 'UTC' ? 'Europe/London' : 'UTC', ff: f, tf: f, date: ymd_of(p), h: p.h, m: p.mi, dk: 0 };
}
const fmt = (h, m, mode) => mode === '24' ? [`${pad(h)}:${pad(m)}`, ''] : [`${h % 12 || 12}:${pad(m)}`, h < 12 ? 'AM' : 'PM'];
const diff = min => { if (!min) return 'Same time'; const a = Math.abs(min), h = Math.floor(a / 60), m = a % 60;
  return `${min > 0 ? '+' : '−'}${h ? h + 'h' : ''}${h && m ? ' ' : ''}${m ? m + 'm' : ''}`; };
const H12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], H24 = Array.from({ length: 24 }, (_, i) => i), MINS = Array.from({ length: 60 }, (_, i) => i);

/* a segmented choice (12h / 24h, AM / PM) */
const seg = (name, val, opts, put, label) => <div className="seg" role="radiogroup" aria-label={label}>{opts.map(([v, l]) =>
  <label key={v}><input type="radio" className="sr-only" name={name} checked={val === v} onChange={() => put(v)} /><span>{l}</span></label>)}</div>;
const zone_field = (id, v, put, t) => <div className="field"><label htmlFor={id}>Time zone</label>
