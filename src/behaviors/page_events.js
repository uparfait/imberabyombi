/* behaviors/page_events.js: the tab icon (brand colour in front, ink behind), form resets, Esc on dialogs, file dialogs closed
   without a choice, broken-image fallbacks and the system theme following the OS. */
import { qs, qsa, css_var, rgb2hex } from '../lib/index.js';
import { db } from '../store/index.js';
import { pick, ms_sync, request_close } from '../overlays/index.js';
import { file_tiles } from '../files/index.js';
import { set_theme } from '../actions/index.js';

/* Tab icon: brand colour while this tab is in front, black (brand ink) while the user is on another tab (a data: URL string) */
