/* panels.jsx: side panels (Imberabyombi style): Imberabyombi notes, an Imberabyombi task list of my tasks, Help.
   Each: t = title, h() = body, tools() = extra header buttons. Drawn by panel_html(); refresh_panel() draws the open one again. */
import { fmt_stamp } from '../lib/index.js';
import { ic, i3 } from '../icons/index.js';
import { db } from '../store/index.js';
import { me } from '../auth/index.js';
import { empty, search_box } from '../ui/index.js';
