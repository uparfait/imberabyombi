/* sidebar.jsx: the admin sidebar: logo row, Create menu, mini calendar, module links by group, footer links.
   side_spin(link) shows the loading spinner in a clicked sidebar link until the next page draws. */
import { uniq } from '../lib/index.js';
import { ic, mark3d } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { auth, MODS } from '../auth/index.js';
import { spinner } from '../feedback/index.js';
import { side_section } from './side_section.jsx';
import { mini_cal } from './calendar_items.jsx';
import { Live_slot, redraw_slot, closed_pop } from './live_slot.jsx';
import { to } from '../router/index.js';

/* the Create menu: [module, collection, label, icon], shown when the role can manage the module */
