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
  <select id={id} value={v} onChange={e => put(e.target.value)}>{zone_list(t).map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}</select></div>;
const FMT = [['12', '12h'], ['24', '24h']];

export function Tz_page() {
  const [st, set] = useState(first), put = o => set(s => ({ ...s, ...o }));
  const [y, mo, d] = st.date.split('-').map(Number), t = zoned_to_utc(y, mo, d, st.h, st.m, st.from);
  const tp = tz_parts(st.to, t), up = tz_parts('UTC', t), fo = offset_min(st.from, t), to = offset_min(st.to, t);
  const [main, suf] = fmt(tp.h, tp.mi, st.tf), days = Math.round((Date.UTC(tp.y, tp.mo - 1, tp.d) - Date.UTC(y, mo - 1, d)) / 864e5);
  const chips = [gmt(to), diff(to - fo), ...(days > 0 ? ['Next day'] : days < 0 ? ['Previous day'] : [])];
  const is12 = st.ff === '12', [um, us] = fmt(up.h, up.mi, st.tf);
  /* Now and Swap set the date field anew (dk: its key), the rest follows the state */
  const now = () => { const p = tz_parts(st.from, Date.now()); put({ date: ymd_of(p), h: p.h, m: p.mi, dk: st.dk + 1 }); };
  const swap = () => put({ from: st.to, to: st.from, ff: st.tf, tf: st.ff, date: ymd_of(tp), h: tp.h, m: tp.mi, dk: st.dk + 1 });
  return <div className="page_enter">
    {page_title('TZ PlayGround', 'Timezone PlayGround. Pick a date and time in one time zone to see it in another. Swap turns them around; Now sets the current '
      + 'time. Search the time zones by city, name or offset, such as GMT+2.')}
    <div className="tzc">
      <section className="card p-5" aria-label="From">
        <div className="tzc_head"><h3 className="tzc_cap">From</h3>{seg('tz_ff', st.ff, FMT, v => put({ ff: v }), 'Time format')}</div>
        {zone_field('tz_from', st.from, v => put({ from: v }), t)}
        <div className="mt-3 grid gap-3">
          <div className="field"><label htmlFor="tz_date">Date</label><input key={st.dk} id="tz_date" {...dt_attrs('date')} defaultValue={st.date}
            onChange={e => /^\d{4}-\d{2}-\d{2}$/.test(e.target.value) && put({ date: e.target.value })} /></div>
          <div className="tzc_time_row">
            <div className="field tzc_num"><label htmlFor="tz_h">Hour</label>
              <select id="tz_h" value={is12 ? st.h % 12 || 12 : st.h} onChange={e => { const v = +e.target.value; put({ h: is12 ? v % 12 + (st.h >= 12 ? 12 : 0) : v }); }}>
                {(is12 ? H12 : H24).map(h => <option key={h} value={h}>{is12 ? h : pad(h)}</option>)}</select></div>
            <span className="tzc_colon" aria-hidden="true">:</span>
            <div className="field tzc_num"><label htmlFor="tz_m">Minute</label>
              <select id="tz_m" value={st.m} onChange={e => put({ m: +e.target.value })}>{MINS.map(m => <option key={m} value={m}>{pad(m)}</option>)}</select></div>
            {is12 ? seg('tz_ampm', st.h < 12 ? 'AM' : 'PM', [['AM', 'AM'], ['PM', 'PM']], v => put({ h: st.h % 12 + (v === 'PM' ? 12 : 0) }), 'AM or PM') : null}
