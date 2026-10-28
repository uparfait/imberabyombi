/* feedback/request.js: D. Loading: the floating #loader (req), a busy button (busy) and request(), which wraps every
   user request (save, delete, update, get) with the simulated latency, the loaders and the error notification. */
import { qs } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { sleep, staff_page } from './basics.js';
import { spinner_html } from './spinner.jsx';
import { notify } from './notify.js';
