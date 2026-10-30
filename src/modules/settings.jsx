/* modules/settings.jsx: VIEWS.settings: appearance (theme, brand colour, body font, corner radius, spacing; saved in this
   browser), the time zone every page shows, data in this browser (used space, export / import a backup, reset demo data),
   your profile and the design system.
   The token fields are new on every draw (keyed by the draw), so a reset (tok_reset → rerender) shows the stylesheet values. */
import { VIEWS } from './views.js';
import { db, get_version } from '../store/index.js';
import { auth } from '../auth/index.js';
import { cap, css_var, rgb2hex, page_tz, device_tz, zone_list, zone_of } from '../lib/index.js';
import { cfg } from '../config/index.js';
import { ic } from '../icons/index.js';
import { to } from '../router/index.js';
import { help_tip } from '../ui/index.js';

const FONTS = ['Figtree', 'Bricolage Grotesque', 'system-ui'];
/* a range token: its label shows the value (#token_<k>_out, updated while dragging) */
