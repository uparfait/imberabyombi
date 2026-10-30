/* modules/dashboard.jsx: VIEWS.dashboard, the start page: a welcome band (date, name, role), key numbers the role can
   open (they count up after the draw: data-count) and the cards from dashboard_widgets.jsx. */
import { VIEWS } from './views.js';
import { db } from '../store/index.js';
import { auth } from '../auth/index.js';
import { lorem, page_now } from '../lib/index.js';
import { ic, i3, hue_at } from '../icons/index.js';
import { dash_widgets } from './dashboard_widgets.jsx';
import { to } from '../router/index.js';
