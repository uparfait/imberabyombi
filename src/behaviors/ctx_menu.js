/* behaviors/ctx_menu.js: the right-click menu (#ctx, outside React, filled as an HTML string like the reference).
   Right-click menu on the page body: quick links (signed in: Tasks and Calendar; visitors: the public pages), back / reload and the
   text-selection switch. Fields, tables, code, copy boxes, dialogs and selected text keep the browser's own menu (to copy). */
import { qs, esc } from '../lib/index.js';
import { ic_html } from '../icons/index.js';
import { auth, MODS } from '../auth/index.js';
import { key_hint } from '../feedback/index.js';
import { tip } from '../overlays/index.js';
