/* modules/settings.jsx: VIEWS.settings: appearance (theme, brand colour, body font, corner radius, spacing; saved in this
   browser), the time zone every page shows, data in this browser (used space, export / import a backup, reset demo data),
   your profile and the design system.
   The token fields are new on every draw (keyed by the draw), so a reset (tok_reset → rerender) shows the stylesheet values. */
import { VIEWS } from './views.js';
import { db, get_version } from '../store/index.js';
import { auth } from '../auth/index.js';
import { cap, css_var, rgb2hex, page_tz, device_tz, zone_list, zone_of } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { help_tip } from '../ui/index.js';

const FONTS = ['Figtree', 'Bricolage Grotesque', 'system-ui'];
/* a range token: its label shows the value (#token_<k>_out, updated while dragging) */
const range = (k, label, v, min, max, step) => <div className="field">
  <label htmlFor={`token_${k}`}>{label} <output id={`token_${k}_out`}>{`${v}rem`}</output></label>
  <input id={`token_${k}`} type="range" min={min} max={max} step={step} defaultValue={v} data-token={k} /></div>;

function appearance(tk, th) {
  const brand = tk.brand || rgb2hex(css_var('--brand')), radius = tk.radius ?? parseFloat(css_var('--radius')), space = tk.space ?? parseFloat(css_var('--space'));
  return <section className="card p-6"><h2 className="text-lg">Appearance</h2>
    <p className="mt-1 text-sm text-muted">Changes apply instantly and are saved in this browser.</p>
    <fieldset className="mt-5 border-0 p-0"><legend className="mb-2 px-0 text-sm">Theme</legend><div className="seg">{['light', 'dark', 'system'].map(v => <label key={v}>
      <input type="radio" className="sr-only" name="theme" value={v} data-theme-set="" defaultChecked={th === v} /><span>{cap(v)}</span></label>)}</div></fieldset>
    <div key={get_version()} className="mt-6 grid gap-5 sm:grid-cols-2">
      <div className="field"><label htmlFor="token_brand">Brand colour</label>
        <div className="flex items-center gap-3"><input id="token_brand" type="color" defaultValue={brand} data-token="brand" />
          <output id="token_brand_out">{brand}</output></div></div>
      <div className="field"><label htmlFor="token_font">Body font</label>
        <select id="token_font" data-token="font" defaultValue={tk.font}>{FONTS.map(f => <option key={f}>{f}</option>)}</select></div>
      {range('radius', 'Corner radius', radius, '0', '2', '.125')}{range('space', 'Spacing scale', space, '.75', '1.5', '.05')}
    </div><button className="btn btn_outline btn_sm mt-6" data-act="tok_reset">{ic('refresh', 'h-4 w-4')}Reset to stylesheet values</button></section>;
}

/* the time zone every date and time follows (the calendar, today, activities and events set in other zones) */
const time_zone = () => <section className="card p-6"><div className="flex items-center gap-1"><h2 className="text-lg">Time zone</h2>
  {help_tip('Every date and time in the system shows in this time zone: today, the calendar, and activities and events set in other time zones, '
    + 'converted. New activities and events start in it. Saved in this browser.', 'the time zone')}</div>
  <div key={page_tz()} className="field mt-5"><label htmlFor="page_tz">Show times in</label>
    <select id="page_tz" data-page-tz="" defaultValue={page_tz()}>{zone_list().map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}</select></div>
  {page_tz() !== device_tz() ? <button className="btn btn_outline btn_sm mt-4" data-act="tz_device">{`Use this device's (${zone_of(device_tz()).short})`}</button> : null}
</section>;

function data_card() {
  const used = db.bytes(), pct = Math.min(100, Math.round(used / cfg.storage_cap * 100));
  return <section className="card p-6"><h2 className="text-lg">Data in this browser</h2>
    <p className="mt-1 text-sm text-muted">Everything is saved with localStorage on this device only.</p>
    <p className="mt-5 flex justify-between text-sm"><span>{`${(used / 1024).toFixed(1)} KB used`}</span><span className="text-muted">{`${pct}% of 5 MB`}</span>
      </p><progress className="mt-2" max="100" value={pct}></progress>
    <div className="mt-6 flex flex-wrap gap-2"><button className="btn btn_outline btn_sm" data-act="data_export">{ic('download', 'h-4 w-4')}Export backup</button>
      <label className="btn btn_outline btn_sm cursor-pointer">
        {ic('upload', 'h-4 w-4')}Import backup<input type="file" accept="application/json" className="sr-only" data-import="" /></label>
      {auth.boss() ? <button className="btn btn_danger btn_sm" data-act="data_reset">{ic('trash', 'h-4 w-4')}Reset demo data</button> : null}</div>
        <div id="backup_msg" className="mt-4 empty:hidden"></div></section>;
}

const profile = u => <section className="card p-6"><h2 className="text-lg">Your profile</h2>
  <form data-form="profile" className="mt-5 grid gap-4 sm:grid-cols-2" noValidate>
  <div data-msg-slot="" className="empty:hidden sm:col-span-2"></div>
  <div className="field"><label htmlFor="profile_name">Full name</label>
