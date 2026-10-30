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
