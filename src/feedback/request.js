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
