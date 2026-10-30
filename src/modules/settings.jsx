/* modules/settings.jsx: VIEWS.settings: appearance (theme, brand colour, body font, corner radius, spacing; saved in this
   browser), the time zone every page shows, data in this browser (used space, export / import a backup, reset demo data),
   your profile and the design system.
   The token fields are new on every draw (keyed by the draw), so a reset (tok_reset → rerender) shows the stylesheet values. */
import { VIEWS } from './views.js';
