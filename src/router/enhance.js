/* router/enhance.js: 14. PROGRESSIVE ENHANCEMENT, run after every draw: reveal-on-scroll, count-up numbers, typing headlines,
   range fills, multi-select labels, token swatches, wheel hand-over, calendar slides, file boxes, media players, section spy. */
import { qsa } from '../lib/index.js';
import { ui, route, TIMERS } from '../store/index.js';
import { ms_sync, slide_in } from '../overlays/index.js';
import { file_box } from '../files/index.js';
import { fill_range, hex_refresh, init_player } from '../actions/index.js';
import { header_line, chain_wheel } from '../behaviors/index.js';

export function count_up(el) {
  const to = +el.dataset.count; if (el._c || isNaN(to)) return; el._c = 1;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to; return; }
  const t0 = performance.now(), step = t => { const p = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

export function typer(el) {
  let w; try { w = JSON.parse(el.dataset.type); } catch { return; }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = w[0]; return; }
  let i = 0, j = 0, del = false, hold = 0;
  TIMERS.push(setInterval(() => { if (hold) { hold--; return; } const s = w[i]; j += del ? -1 : 1; el.textContent = s.slice(0, j);
    if (!del && j === s.length) { del = true; hold = 22; } else if (del && j === 0) { del = false; i = (i + 1) % w.length; hold = 4; } }, 75));
}

let spy = null;   /* the home page's section spy (one at a time: React keeps the sections across redraws) */
export function enhance() {
