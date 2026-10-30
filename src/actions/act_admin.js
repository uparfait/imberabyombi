/* actions/act_admin.js: data-act handlers of the admin shell and its tools: email designs, nested navigation, side panels,
   notes, design tokens, backup and demo-data reset. Each handler changes data, and the page redraws from it. */
import { qs, qsa, ymd, dl } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
