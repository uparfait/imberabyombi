/* behaviors/pointer_events.js: tooltips + suggestion lists on hover (mouse/pen only) and keyboard focus, chart tooltips that
   follow the pointer, and the date hint shown while a date/time field has focus. */
import { DTF, ghost } from '../fields/index.js';
import { pick, tip } from '../overlays/index.js';
import { viz_tip } from '../charts/index.js';

/* Chart tooltips follow the pointer (a tap shows one on touch screens) */
export const viz_point = e => { const v = e.target.closest?.('.viz_plot [data-tt], .kpi [data-tt]'); v ? viz_tip.show(v, e.clientX, e.clientY) : viz_tip.cur && viz_tip.hide(); };

function on_focusin(e) {
  const t = e.target;
