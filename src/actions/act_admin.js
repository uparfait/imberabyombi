/* actions/act_admin.js: data-act handlers of the admin shell and its tools: email designs, nested navigation, side panels,
   notes, design tokens, backup and demo-data reset. What the reference rewrote in place is now data + a redraw. */
import { qs, qsa, ymd, dl } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { me } from '../auth/index.js';
