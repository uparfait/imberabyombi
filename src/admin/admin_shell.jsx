/* admin_shell.jsx: 10. ADMIN SHELL (top bar, sidebar, side rail, panels): the admin page around a module view.
   The switches ACT.side flips in place (sidebar open / scrim) are set again from ui after every draw, as the reference's
   fresh HTML did; #main is new on every new page, so its enter animation plays again. */
import { ic, i3 } from '../icons/index.js';
import { ui, render_flags, get_version } from '../store/index.js';
import { MODS } from '../auth/index.js';
import { sidebar } from './sidebar.jsx';
import { header_tools } from './header_tools.jsx';
import { panel_html } from './panel_html.jsx';
import { Live_slot, sync_ref } from './live_slot.jsx';

const RAIL = [['notes', 'bulb', 'text-warn', 'Notes'], ['tasks', 'check', 'text-info', 'My tasks'], ['help', 'help', 'text-ok', 'Help']];
const panel_now = () => ui.panel ? panel_html(ui.panel) : null;
