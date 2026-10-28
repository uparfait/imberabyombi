/* feedback/request.js: D. Loading: the floating #loader (req), a busy button (busy) and request(), which wraps every
   user request (save, delete, update, get) with the simulated latency, the loaders and the error notification. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { sleep, staff_page } from './basics.js';
import { spinner_html } from './spinner.jsx';
import { notify } from './notify.js';

/* D. Loading: a busy button spins in place. On staff (admin) pages every request (delete, update, get) also shows the
      floating #loader at the top (after 150 ms, so instant work such as navigation never flashes it). Public and
      sign-in pages never show #loader: there only the busy button spins. */
export const req = {
  n: 0, t: null,
  start() { if (this.n++ > 0) return; clearTimeout(this.t); this.t = setTimeout(() => qs('#loader')?.classList.add('on'), 150); },
  done() { if (this.n === 0 || --this.n > 0) return; clearTimeout(this.t); qs('#loader')?.classList.remove('on'); }
};
/* The spinner is the one element ever added inside a (React) button; busy(btn, false) removes it again */
export function busy(btn, on) {
  btn.classList.toggle('is_busy', on); btn.disabled = on;
  if (on) { btn.setAttribute('aria-busy', 'true'); btn.insertAdjacentHTML('beforeend', spinner_html()); }
  else { btn.removeAttribute('aria-busy'); btn.querySelector(':scope > .spinner_segmented_svg')?.remove(); }
}
export async function request(fn, { btn = null, delay = cfg.latency } = {}) {
  const top = staff_page();   /* read once, so start and done always pair up even if fn changes the page */
  if (btn) busy(btn, true); if (top) req.start();
  try { if (delay) await sleep(delay); return await fn(); }
  catch (e) { console.error(e); notify('The request could not be completed. Check your connection and try again.', 'bad'); return false; }
  finally { if (btn) busy(btn, false); if (top) req.done(); }
}
